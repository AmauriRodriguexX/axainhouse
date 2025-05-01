// === VALIDATE-FORMS.JS ===

// Paso 1: Habilitar botón solo si todos los selects tienen valor
function validateStep1() {
  const requiredSelects = ['marca', 'anio', 'modelo', 'version'];
  const btnStep1 = document.querySelector('.step-1 .btn-next');

  function checkAllFilled() {
    const allFilled = requiredSelects.every(id => {
      const el = document.getElementById(id);
      return el && el.value && el.selectedIndex > 0;
    });

    btnStep1.disabled = !allFilled;
  }

  requiredSelects.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', checkAllFilled);
    }
  });
}

// Paso 2: Validación completa al hacer clic en CONTINUAR
function setupStepValidation() {
  document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', function () {
      const step = btn.closest('.step');
      const stepNumber = parseInt(btn.dataset.next) - 1;

      // Solo validar si estamos en el paso 2
      if (!step.classList.contains('step-2')) return;

      const inputs = step.querySelectorAll('input[required], select[required]');
      let valid = true;

      inputs.forEach(input => {
        input.classList.remove('is-invalid');
        const value = input.value.trim();

        if (!value || (input.tagName === 'SELECT' && input.selectedIndex === 0)) {
          input.classList.add('is-invalid');
          valid = false;
        }

        if ((input.id === 'nombre' || input.id === 'apellido1') && /\d/.test(value)) {
          input.classList.add('is-invalid');
          valid = false;
        }

        if (input.id === 'telefono' && !/^\d{10}$/.test(value)) {
          input.classList.add('is-invalid');
          valid = false;
        }

        if (input.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          input.classList.add('is-invalid');
          valid = false;
        }
      });

      if (valid) {
        goToStep(stepNumber + 2); // avanzar al siguiente paso (step 3)
      }
    });
  });
}

// Validación en tiempo real al salir del input
function setupRealtimeValidation() {
  document.querySelectorAll('input[required], select[required]').forEach(input => {
    input.addEventListener('blur', () => {
      input.classList.remove('is-invalid');
      const value = input.value.trim();

      if (!value || (input.tagName === 'SELECT' && input.selectedIndex === 0)) {
        input.classList.add('is-invalid');
      }

      if ((input.id === 'nombre' || input.id === 'apellido1') && /\d/.test(value)) {
        input.classList.add('is-invalid');
      }

      if (input.id === 'telefono' && !/^\d{10}$/.test(value)) {
        input.classList.add('is-invalid');
      }

      if (input.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        input.classList.add('is-invalid');
      }
    });
  });
}

// Validación en tiempo real del paso 2 para habilitar botón
function validateStep2FieldsFilled() {
  const btnStep2 = document.querySelector('.step-2 .btn-next');
  const requiredIds = ['nombre', 'apellido1', 'dia', 'mes', 'anio-nac', 'email', 'telefono', 'cp'];

  function checkFields() {
    let allValid = true;

    requiredIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el || !el.value.trim() || (el.tagName === 'SELECT' && el.selectedIndex === 0)) {
        allValid = false;
      }

      if (id === 'email' && el && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
        allValid = false;
      }

      if (id === 'telefono' && el && !/^\d{10}$/.test(el.value)) {
        allValid = false;
      }

      if ((id === 'nombre' || id === 'apellido1') && el && /\d/.test(el.value)) {
        allValid = false;
      }
    });

    btnStep2.disabled = !allValid;
  }

  requiredIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', checkFields);
      if (el.tagName === 'SELECT') {
        el.addEventListener('change', checkFields);
      }
    }
  });
}

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
  validateStep1();
  setupStepValidation();
  setupRealtimeValidation();
  validateStep2FieldsFilled(); // ✅ ¡Ahora sí se ejecuta!
});


function validateEmailMatch() {
  const email1 = document.getElementById('emailConfirm');
  const email2 = document.getElementById('emailConfirm2');
  const btn = document.getElementById('btnEnviar');

  const email2Value = email2.value.trim();

  if (!email2Value || email1.value !== email2Value) {
    email2.classList.add('is-invalid');
    btn.disabled = true;
  } else {
    email2.classList.remove('is-invalid');
    btn.disabled = false;
  }
}