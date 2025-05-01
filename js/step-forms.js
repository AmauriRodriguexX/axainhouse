document.addEventListener('DOMContentLoaded', function () {
     const steps = document.querySelectorAll('.step');
     const progressBar = document.querySelector('.progress-bar');
     const stepText = document.querySelector('.progress-step-wrapper p');
   
     function goToStep(stepNumber) {
       steps.forEach((step, index) => {
         step.classList.toggle('d-none', index !== stepNumber - 1);
       });
   
       if (progressBar) {
         const percent = (stepNumber / steps.length) * 100;
         progressBar.style.width = `${percent}%`;
       }
   
       if (stepText) {
         stepText.textContent = `Paso ${stepNumber} de ${steps.length}`;
       }
   
       // 👉 Scroll automático al inicio del formulario
       const formStepSection = document.querySelector('.form-step');
       if (formStepSection) {
          window.scrollTo({
               top: 0,
               behavior: 'smooth'
             });
             
       }
     }
   
     // Avanzar paso
     document.querySelectorAll('.btn-next').forEach(btn => {
       btn.addEventListener('click', () => {
         const nextStep = parseInt(btn.dataset.next);
         goToStep(nextStep);
       });
     });
   
     // Retroceder paso
     document.querySelectorAll('.btn-prev').forEach(btn => {
       btn.addEventListener('click', () => {
         const prevStep = parseInt(btn.dataset.prev);
         goToStep(prevStep);
       });
     });
   
     // Iniciar en el paso 1
     goToStep(1);
   });
   