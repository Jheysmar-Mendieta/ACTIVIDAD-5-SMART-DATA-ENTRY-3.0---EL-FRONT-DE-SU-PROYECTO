function validarTexto(inputId, hintId, minLen, mensaje) {
    const input = document.getElementById(inputId);
    const hint  = document.getElementById(hintId);

    if (!input) return;

    input.addEventListener('input', () => {
        if (input.value.length === 0) {
            input.className = '';
            hint.textContent = '';
            hint.className = 'hint';
        } else if (input.value.length < minLen) {
            input.className = 'error';
            hint.textContent = '✗ ' + mensaje;
            hint.className = 'hint error';
        } else {
            input.className = 'ok';
            hint.textContent = '✓ OK';
            hint.className = 'hint ok';
        }
    });
}

// Aplicar validaciones
validarTexto('nombre',   'hint-nombre',   2, 'Mínimo 2 caracteres');
validarTexto('apellido', 'hint-apellido', 2, 'Mínimo 2 caracteres');

const correoInput = document.getElementById('correo');
const correoHint  = document.getElementById('hint-correo');

correoInput.addEventListener('input', () => {
    if (correoInput.value.length === 0) {
        correoInput.className = '';
        correoHint.textContent = '';
        correoHint.className = 'hint';
    } else if (!correoInput.value.includes('@') || !correoInput.value.includes('.')) {
        correoInput.className = 'error';
        correoHint.textContent = '✗ Correo inválido';
        correoHint.className = 'hint error';
        correoInput.style.border = '2px solid red';
    } else {
        correoInput.className = 'ok';
        correoHint.textContent = '✓ Correo válido';
        correoHint.className = 'hint ok';
        correoInput.style.border = '2px solid green';
    }
});

const obs = document.getElementById("observaciones");
const contador = document.getElementById("contadorObs");

if (obs && contador) {
    obs.addEventListener("input", () => {
        contador.textContent = obs.value.length + " caracteres";
    });
}

const fotoInput   = document.getElementById('fotoEntorno');
const imgPreview  = document.getElementById('imgPreview');
const placeholder = document.getElementById('placeholder');

if (fotoInput) {
    fotoInput.addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            imgPreview.src = e.target.result;
            imgPreview.style.display = 'block';
            placeholder.style.display = 'none';
        };

        reader.readAsDataURL(file);
    });
}

function toast(msg, color) {
    Toastify({
        text: msg,
        duration: 3500,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
            background: color,
            borderRadius: '10px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.88rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }
    }).showToast();
}

const form = document.getElementById('simcForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre   = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const correo   = document.getElementById('correo').value.trim();
    const entorno  = document.getElementById('entorno').value;
    const actividad = document.getElementById('actividad').value;

    // checkboxes
    const condiciones = Array.from(document.querySelectorAll('input[name="condiciones"]:checked'))
        .map(el => el.value);

    // validación
    if (!nombre || !apellido || !correo || !entorno || !actividad) {
        toast('⚠ Completá todos los campos obligatorios', '#ff4d6d');
        return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
        toast('⚠ El correo electrónico no es válido', '#ff4d6d');
        return;
    }

    // animación envío
    form.style.opacity = "0.5";
    form.style.pointerEvents = "none";

    setTimeout(() => {

        const datos = {
            nombre,
            apellido,
            correo,
            entorno,
            actividad,
            condiciones,
            observaciones: obs.value,
            timestamp: new Date().toISOString()
        };

        console.log(' Datos a enviar (JSON):', JSON.stringify(datos, null, 2));

        toast('✔ Sesión registrada correctamente', 'linear-gradient(135deg, #00c6ff, #0052ff)');

        // reset
        form.reset();
        if (contador) contador.textContent = "0 caracteres";

        if (imgPreview) imgPreview.style.display = 'none';
        if (placeholder) placeholder.style.display = 'flex';

        form.style.opacity = "1";
        form.style.pointerEvents = "auto";

        document.querySelectorAll('.field input, .field select').forEach(el => el.className = '');
        document.querySelectorAll('.hint').forEach(el => {
            el.textContent = '';
            el.className = 'hint';
        });

    }, 1200);
});