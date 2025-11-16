// Main client-side script: OCR (Tesseract) and Speech Recognition
document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('imageInput');
  const imagePreview = document.getElementById('imagePreview');
  const ocrStatus = document.getElementById('ocrStatus');
  const textarea = document.getElementById('txt');
  const micBtn = document.getElementById('micBtn');
  const micIcon = document.getElementById('micIcon');
  const enteredTextEl = document.querySelector('.entered-text');

  // update preview of entered text live
  if (textarea && enteredTextEl) {
    textarea.addEventListener('input', () => {
      enteredTextEl.textContent = textarea.value || 'No input yet';
    });
  }

  // IMAGE OCR using Tesseract.js
  if (imageInput) {
    imageInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // preview
      const url = URL.createObjectURL(file);
      imagePreview.innerHTML = '';
      const img = document.createElement('img'); img.src = url; imagePreview.appendChild(img);

      // run OCR
      ocrStatus.textContent = 'Recognizing text from image...';

      try {
        const worker = Tesseract.createWorker({
          logger: m => {
            if (m.status && m.progress != null) {
              const pct = Math.round(m.progress * 100);
              ocrStatus.textContent = `OCR: ${m.status} (${pct}%)`;
            }
          }
        });

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();

        const extracted = (text || '').trim();
        if (extracted) {
          textarea.value = extracted;
          textarea.dispatchEvent(new Event('input'));
          ocrStatus.textContent = 'Text extracted. You can edit it and click Check.';
        } else {
          ocrStatus.textContent = 'No readable text found in the image.';
        }
      } catch (err) {
        console.error(err);
        ocrStatus.textContent = 'OCR failed. Try a clearer image.';
      }
    });
  }

  // VOICE / SPEECH input using Web Speech API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = '';

    recognition.addEventListener('start', () => {
      micBtn.classList.add('listening');
      micIcon.classList.remove('fa-microphone');
      micIcon.classList.add('fa-circle-notch', 'fa-spin');
      ocrStatus.textContent = 'Listening — speak your news...';
    });

    recognition.addEventListener('end', () => {
      micBtn.classList.remove('listening');
      micIcon.classList.remove('fa-circle-notch','fa-spin');
      micIcon.classList.add('fa-microphone');
      ocrStatus.textContent = '';
    });

    recognition.addEventListener('result', (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        if (e.results[i].isFinal) {
          finalTranscript += e.results[i][0].transcript;
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      textarea.value = (finalTranscript + ' ' + interim).trim();
      textarea.dispatchEvent(new Event('input'));
    });
  } else {
    // disable mic if not supported
    micBtn.title = 'Voice input not supported in this browser';
    micBtn.classList.add('disabled');
  }

  micBtn.addEventListener('click', () => {
    if (!recognition) {
      ocrStatus.textContent = 'Voice input not supported on this device/browser.';
      return;
    }

    try {
      // toggle: if listening, stop; else start
      if (micBtn.classList.contains('listening')) {
        recognition.stop();
      } else {
        // reset finalTranscript for fresh capture
        recognition.start();
      }
    } catch (err) {
      console.error('Speech API error:', err);
    }
  });

});
