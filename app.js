// Datos de ejemplo para expedientes
const expedientes = [
    { 
        nombre: "Milo", 
        especie: "Pez", 
        edad: 5, 
        ultimaVisita: "2025-10-15",
        historial: ["Vacuna antirrábica (2023)", "Desparasitación (2023)"]
    },
     
     { 
     nombre: "Coqueta", 
        especie: "Perro", 
        edad: 3, 
        ultimaVisita: "2025-11-02",
        historial: ["Castración (2022)", "Vacuna triple felina (2023)"]
    },

    { 
        nombre: "Luna", 
        especie: "Gato", 
        edad: 3, 
        ultimaVisita: "2025-11-02",
        historial: ["Castración (2022)", "Vacuna triple felina (2023)"]
    }
];


function cargarServicios() {
    const contenedor = document.getElementById('lista-servicios');
    contenedor.innerHTML = '';
// Datos de servicios (reemplazar con Firebase)
const serviciosDB = [
    {
        id: 1,
        nombre: "Consulta General",
        descripcion: "Revisión médica completa con diagnóstico",
        precio: 350,
        duracion: "30 min",
        categoria: "Consultas"
    },
    {
        id: 2,
        nombre: "Vacunación Completa",
        descripcion: "Paquete de vacunas básicas para mascotas",
        precio: 600,
        duracion: "45 min",
        categoria: "Prevención"
    },
    {
        id: 3,
        nombre: "Limpieza Dental",
        descripcion: "Profilaxis dental con ultrasonido",
        precio: 800,
        duracion: "1 hora",
        categoria: "Odontología"
    }
];
    serviciosDB.forEach(servicio => {
        const card = document.createElement('div');
        card.className = 'servicio-card';
        card.innerHTML = `
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <div class="precio">$Q{servicio.precio} MXN</div>
            <div class="duracion">Duración: ${servicio.duracion}</div>
            <button class="btn-reservar" data-id="${servicio.id}">
                Reservar este servicio
            </button>
        `;

        contenedor.appendChild(card);
    });

    // Eventos para botones de reserva
    document.querySelectorAll('.btn-reservar').forEach(btn => {
        btn.addEventListener('click', function() {
            const servicioId = this.getAttribute('data-id');
            const servicio = serviciosDB.find(s => s.id == servicioId);
            abrirModalReserva(servicio);
        });
    });
}

function abrirModalReserva(servicio) {
    // Implementar lógica para mostrar modal de reserva
    alert(`Reservando: ${servicio.nombre}\nPrecio: $${servicio.precio} MXN`);
}

// Iniciar
document.addEventListener('DOMContentLoaded', cargarServicios);


// Cargar expedientes al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarExpedientes();
    
    // Animación para botones
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
});
// Datos de ejemplo (reemplazar con Firebase)
let reservasDB = [
    { id: 1, mascota: "Max", servicio: "Consulta", fecha: "2025-11-15", hora: "10:00", estado: "confirmada" },
    { id: 2, mascota: "Coqueta", servicio: "Servicio gorroming", fecha: "2025-11-15", hora: "10:00", estado: "confirmada" },
    { id: 3, mascota: "Luna", servicio: "Vacunación", fecha: "2025-11-16", hora: "15:30", estado: "pendiente" }
];

function cargarReservas() {
    const contenedor = document.getElementById('lista-reservas');
    contenedor.innerHTML = '<h3>Próximas reservas</h3>';

    reservasDB.forEach(reserva => {
        const item = document.createElement('div');
        item.className = `reserva-item ${reserva.estado}`;
        item.innerHTML = `
            <div>
                <strong>${reserva.mascota}</strong>
                <p>${reserva.servicio} - ${reserva.fecha} ${reserva.hora}</p>
            </div>
            <span class="estado">${reserva.estado}</span>
        `;
        contenedor.appendChild(item);
    });
}

// Inicializar calendario (requiere FullCalendar.js)
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendario');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: reservasDB.map(reserva => ({
            title: `${reserva.mascota} - ${reserva.servicio}`,
            date: reserva.fecha,
            color: reserva.estado === 'confirmada' ? '#4CAF50' : '#FF9800'
        }))
    });
    calendar.render();
    cargarReservas();
});
// Datos de ejemplo (en producción, reemplazar con Firebase)
const expedientesDB = [
    {
        id: 1,
        nombre: "Max",
        especie: "Perro",
        edad: 5,
        dueño: "Ana López",
        historial: [
            { fecha: "2023-10-15", servicio: "Vacuna antirrábica", notas: "Aplicada sin complicaciones" },
            { fecha: "2023-09-01", servicio: "Desparasitación", notas: "Dosis mensual" }
        ]
    },
    // Agrega más registros...
];

function cargarExpedientes(busqueda = '') {
    const contenedor = document.getElementById('lista-expedientes');
    contenedor.innerHTML = '';

    const resultados = busqueda 
        ? expedientesDB.filter(exp => 
            exp.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            exp.dueño.toLowerCase().includes(busqueda.toLowerCase()))
        : expedientesDB;

    resultados.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'expediente-card';
        card.innerHTML = `
            <h3>${exp.nombre}</h3>
            <p><strong>Especie:</strong> ${exp.especie}</p>
            <p><strong>Edad:</strong> ${exp.edad} años</p>
            <p><strong>Dueño:</strong> ${exp.dueño}</p>
            <div class="historial">
                <h4>Últimos procedimientos:</h4>
                <ul>
                    ${exp.historial.slice(0, 3).map(item => `
                        <li><strong>${item.fecha}:</strong> ${item.servicio} - ${item.notas}</li>
                    `).join('')}
                </ul>
            </div>
            <button class="btn-ver-mas" data-id="${exp.id}">Ver completo</button>
        `;
        contenedor.appendChild(card);
    });
}

// Buscador
document.getElementById('btn-buscar').addEventListener('click', () => {
    const busqueda = document.getElementById('buscar-mascota').value;
    cargarExpedientes(busqueda);
});

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', cargarExpedientes);

function cargarExpedientes() {
    const contenedor = document.getElementById('lista-expedientes');
    contenedor.innerHTML = '';

    expedientes.forEach(mascota => {
        const card = document.createElement('div');
        card.className = 'expediente';
        card.innerHTML = `
            <h3>${mascota.nombre}</h3>
            <p><strong>Especie:</strong> ${mascota.especie}</p>
            <p><strong>Edad:</strong> ${mascota.edad} años</p>
            <p><strong>Última visita:</strong> ${mascota.ultimaVisita}</p>
            <div class="historial">
                <h4>Historial:</h4>
                <ul>
                    ${mascota.historial.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Formulario de citas
document.getElementById('form-cita').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombreMascota = document.getElementById('nombre-mascota').value;
    const servicio = document.getElementById('servicio').value;
    const fecha = document.getElementById('fecha').value;
    
    if (!nombreMascota || !servicio || !fecha) {
        mostrarAlerta('Por favor complete todos los campos', 'error');
        return;
    }
    
    mostrarAlerta(`✅ Cita reservada para ${nombreMascota} (${servicio}) el ${fecha}`, 'success');
    this.reset();
    // Formulario multipaso
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-reservacion');
    const steps = Array.from(form.querySelectorAll('.form-step'));
    let currentStep = 0;

    // Mostrar primer paso
    showStep(currentStep);

    // Botones Siguiente/Anterior
    form.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    form.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Generar horarios disponibles
    generateTimeSlots();

    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const reservacion = Object.fromEntries(formData);
        
        // Aquí iría la conexión con Firebase
        console.log('Reserva agendada:', reservacion);
        showConfirmation(reservacion);
    });
});

function showStep(stepIndex) {
    document.querySelectorAll('.form-step').forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
    });
}

function validateStep(stepIndex) {
    const currentStep = document.querySelector(`.form-step[data-step="${stepIndex + 1}"]`);
    const inputs = currentStep.querySelectorAll('input[required], select[required]');
    
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value) {
            input.style.borderColor = '#F44336';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

function generateTimeSlots() {
    const container = document.querySelector('.time-slots');
    const hours = ['09:00', '11:00', '13:00', '15:00', '17:00'];
    
    container.innerHTML = '';
    hours.forEach(hour => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'time-slot';
        button.textContent = hour;
        button.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            document.getElementById('hora-cita').value = hour;
        });
        container.appendChild(button);
    });
}

function showConfirmation(data) {
    const confirmationHTML = `
        <div class="confirmation">
            <h3>¡Cita Agendada!</h3>
            <p><strong>Mascota:</strong> ${data['nombre-mascota']}</p>
            <p><strong>Servicio:</strong> ${data.servicio}</p>
            <p><strong>Fecha:</strong> ${data['fecha-cita']} a las ${data['hora-cita']}</p>
            <button class="btn" onclick="location.reload()">Nueva Reserva</button>
        </div>
    `;
    
    document.getElementById('reservaciones').innerHTML = confirmationHTML;
}
});

function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alerta ${tipo}`;
    alerta.textContent = mensaje;
    
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => alerta.remove(), 300);
    }, 3000);
}
// Efecto de carga progresiva
document.querySelectorAll('section').forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
});