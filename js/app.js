/* =============================================
   SALUD YA
   ============================================= */

const Router = (() => {
  const views = {};
  let currentView = null;

  function register(id, renderFn) {
    views[id] = renderFn;
  }

  function navigate(id, params = {}) {
    const container = document.getElementById('view-container');
    if (!container || !views[id]) return;
    currentView = id;
    container.innerHTML = '';
    const el = views[id](params);
    container.appendChild(el);
    updateNav(id);
    requestAnimationFrame(() => {
      container.querySelectorAll('.fade-in').forEach((node, i) => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(14px)';
        setTimeout(() => {
          node.style.transition = 'opacity 380ms ease, transform 380ms cubic-bezier(.4,0,.2,1)';
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
        }, 60 + i * 70);
      });
    });
  }

  function updateNav(id) {
    document.querySelectorAll('.nav-item[data-view]').forEach(item => {
      item.classList.toggle('active', item.dataset.view === id);
    });
  }

  function current() { return currentView; }

  return { register, navigate, current };
})();

/* ── Toast ── */
function showToast(message, type = 'info', duration = 3200) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = {
    success: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    danger:  '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    info:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  };
  toast.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="white" stroke-width="2.5">${icons[type]||icons.info}</svg><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 280ms ease, transform 280ms ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 280);
  }, duration);
}

/* ── Modal helpers ── */
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.getElementById('overlay')?.classList.add('open');
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('open');
}


const SVG = {
  shield:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  home:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  calendar:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  calPlus:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg>`,
  user:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  logout:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  bell:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
  help:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  search:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  plus:      `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  clock:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  pin:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  check:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  arrow_r:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  arrow_l:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  download:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  filter:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  map:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  chat:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  history:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>`,
  lab:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>`,
  doc:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  x:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  warn:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  pencil:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  lock:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  headset:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>`,
  verified:  `<svg viewBox="0 0 24 24" fill="#2B4EE6" stroke="none"><path d="M12 2L9.5 4.5 6 4l-.5 3.5L3 9.5 4.5 12 3 14.5l2.5 2 .5 3.5 3.5-.5L12 22l2.5-2.5 3.5.5.5-3.5 2.5-2L19.5 12 21 9.5l-2.5-2L18 4l-3.5.5L12 2z"/><polyline points="9 12 11 14 15 10" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};


function buildShell(viewId, mainContent) {
  const shell = document.createElement('div');
  shell.className = 'app-shell';
  shell.innerHTML = `
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar__logo">
        <div class="sidebar__logo-icon">${SVG.shield}</div>
        <div class="sidebar__logo-text"><h2>Salud Ya</h2><span>Plataforma Médica</span></div>
      </div>
      <nav class="sidebar__nav">
        <div class="nav-item ${viewId==='dashboard'?'active':''}" data-view="dashboard">${SVG.home}<span>Home</span></div>
        <div class="nav-item ${viewId==='agendar'?'active':''}" data-view="agendar">${SVG.calPlus}<span>Agendar Citas</span></div>
        <div class="nav-item ${viewId==='mis-citas'||viewId==='detalle-cita'?'active':''}" data-view="mis-citas">${SVG.calendar}<span>Mis Citas</span></div>
        <div class="nav-item ${viewId==='perfil'?'active':''}" data-view="perfil">${SVG.user}<span>Mi Perfil</span></div>
      </nav>
      <div class="sidebar__footer">
        <div class="sidebar__support">
          <p>Asistencia 24/7</p>
          <p class="support-sub">¿Necesitas ayuda con la plataforma?</p>
          <button class="btn-support">Contactar</button>
        </div>
        <button class="btn-logout" id="logoutBtn">${SVG.logout}<span>Cerrar Sesión</span></button>
      </div>
    </aside>
    <!-- TOPBAR -->
    <header class="topbar">
      <div class="topbar__search">
        <span class="topbar__search-icon">${SVG.search}</span>
        <input id="searchInput" type="text" placeholder="Buscar doctores, citas o resultados…" />
      </div>
      <div class="topbar__spacer"></div>
      <div class="topbar__actions">
        <button class="topbar__icon-btn" id="notifBtn" aria-label="Notificaciones">
          ${SVG.bell}<span class="topbar__notif-badge" id="notifBadge">2</span>
        </button>
        <button class="topbar__icon-btn">${SVG.help}</button>
        <div class="topbar__divider"></div>
        <div class="topbar__user">
          <div class="topbar__user-info">
            <div class="topbar__user-name">Juan Pérez</div>
            <div class="topbar__user-role">Paciente Premium</div>
          </div>
          <div class="topbar__avatar">JP</div>
        </div>
      </div>
    </header>
    <!-- NOTIF DROPDOWN -->
    <div class="notif-dropdown" id="notifDropdown">
      <div class="notif-dropdown__header">
        <h4>Notificaciones</h4>
        <button id="markAllRead">Marcar todas leídas</button>
      </div>
      <div class="notif-list">
        <div class="notif-item unread"><div class="notif-dot"></div><div class="notif-item__text"><strong>Tu cita con Dr. Gómez fue confirmada</strong><span>Hace 5 min</span></div></div>
        <div class="notif-item unread"><div class="notif-dot"></div><div class="notif-item__text"><strong>Resultado de laboratorio disponible</strong><span>Hace 1 hora</span></div></div>
        <div class="notif-item read"><div class="notif-dot"></div><div class="notif-item__text"><strong>Recordatorio: cita mañana a las 10 AM</strong><span>Ayer</span></div></div>
        <div class="notif-item read"><div class="notif-dot"></div><div class="notif-item__text"><strong>Tu perfil está incompleto</strong><span>Hace 2 días</span></div></div>
      </div>
    </div>
    <!-- MAIN CONTENT -->
    <main class="main-content" id="inner-main">${mainContent}</main>
    <!-- FAB -->
    <button class="fab" id="fab">${SVG.plus}</button>
    <!-- OVERLAY -->
    <div class="overlay" id="overlay"></div>
    <!-- TOAST -->
    <div class="toast-container" id="toastContainer"></div>
  `;
  // Bind nav
  shell.querySelectorAll('.nav-item[data-view]').forEach(item => {
    item.addEventListener('click', () => Router.navigate(item.dataset.view));
  });
  // Notif
  shell.querySelector('#notifBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const dd = shell.querySelector('#notifDropdown');
    const ov = shell.querySelector('#overlay');
    const isOpen = dd.classList.toggle('open');
    ov.classList.toggle('open', isOpen);
    if (isOpen) {
      shell.querySelectorAll('.notif-item').forEach(n => n.classList.remove('unread'));
      shell.querySelector('#notifBadge').style.display = 'none';
    }
  });
  shell.querySelector('#markAllRead')?.addEventListener('click', () => {
    shell.querySelectorAll('.notif-item').forEach(n => n.classList.remove('unread'));
    shell.querySelector('#notifBadge').style.display = 'none';
    shell.querySelector('#notifDropdown').classList.remove('open');
    shell.querySelector('#overlay').classList.remove('open');
  });
  shell.querySelector('#overlay')?.addEventListener('click', () => {
    shell.querySelector('#notifDropdown')?.classList.remove('open');
    shell.querySelector('#overlay')?.classList.remove('open');
    shell.querySelector('#modalConfirm')?.classList.remove('open');
    shell.querySelector('#modalCancelar')?.classList.remove('open');
    shell.querySelector('#modalCancelada')?.classList.remove('open');
  });
  shell.querySelector('#fab')?.addEventListener('click', () => Router.navigate('agendar'));
  shell.querySelector('#logoutBtn')?.addEventListener('click', () => {
    showToast('Sesión cerrada. ¡Hasta pronto!', 'info');
    setTimeout(() => {
      window.location.href = 'login1.html';
    }, 300);
  });
  return shell;
}

/* ─────────────────────────────────────────────────
   VIEW 1 — DASHBOARD
───────────────────────────────────────────────── */
Router.register('dashboard', () => {
  const html = `
    <div class="dash-header fade-in">
      <h1>¡Hola, Profesora! Bienvenida de nuevo</h1>
      <p>Hoy tienes una cita programada y 2 nuevos resultados de laboratorio.</p>
    </div>
    <div class="dash-grid">
      <div class="dash-main">
        <div class="card-proxima-cita fade-in">
          <div class="card-proxima-cita__content">
            <span class="cita-badge">Próxima Cita</span>
            <h2>Cardiología</h2>
            <p class="doctor">Dr. Roberto Gómez</p>
            <div class="cita-meta">
              <div class="cita-meta-item">${SVG.clock} 10:00 AM</div>
              <div class="cita-meta-item">${SVG.pin} Centro Médico Salud Ya — Consultorio 402</div>
            </div>
          </div>
          <div class="card-proxima-cita__right">
            <div class="date-badge"><div class="month">Octubre</div><div class="day">15</div></div>
            <button class="btn-ver-detalles" id="dashVerDetalles">Ver Detalles</button>
          </div>
        </div>
        <div class="fade-in">
          <p class="section-label">Accesos Rápidos</p>
          <div class="accesos-grid">
            <div class="acceso-card" data-action="agendar"><div class="acceso-icon">${SVG.calPlus}</div><span>Agendar Nueva Cita</span></div>
            <div class="acceso-card" data-action="mis-citas"><div class="acceso-icon">${SVG.history}</div><span>Ver Historial</span></div>
            <div class="acceso-card" data-action="lab"><div class="acceso-icon">${SVG.lab}</div><span>Resultados de Laboratorio</span></div>
            <div class="acceso-card" data-action="chat"><div class="acceso-icon">${SVG.chat}</div><span>Chat con Soporte</span></div>
          </div>
        </div>
        <div class="card-actividad fade-in">
          <div class="card-actividad__header">
            <h3>Actividad Reciente</h3>
            <a class="link-ver-todo" id="dashVerTodo">Ver todo</a>
          </div>
          <div class="actividad-list">
            <div class="actividad-item">
              <div class="actividad-icon success">${SVG.check}</div>
              <div class="actividad-info"><strong>Consulta General completada</strong><small>Dra. Elena Martínez • 05 Oct 2023</small></div>
              <span class="badge badge--success">Finalizado</span>
            </div>
            <div class="actividad-item">
              <div class="actividad-icon info">${SVG.doc}</div>
              <div class="actividad-info"><strong>Resultado disponible: Análisis de Sangre</strong><small>Laboratorio Central • 02 Oct 2023</small></div>
              <span class="badge badge--info">Nuevo</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dash-side">
        <div class="card-recordatorio fade-in">
          <div class="card-recordatorio__icon">${SVG.doc}</div>
          <h4>Recordatorios</h4>
          <p>Recuerda completar tu perfil médico para que nuestros especialistas puedan brindarte una mejor atención personalizada.</p>
          <a class="link-completar" id="dashCompletarPerfil">Completar perfil <span>→</span></a>
        </div>
        <div class="card-sede fade-in">
          <div class="card-sede__img">
            <div class="card-sede__img-overlay"></div>
            <div class="card-sede__img-label"><strong>Sede Principal</strong><span>Abierto 24 Horas</span></div>
          </div>
          <div class="card-sede__body">
            <h4>Servicios Disponibles</h4>
            <div class="service-tags">
              <span class="service-tag">Urgencias</span><span class="service-tag">Laboratorio</span><span class="service-tag">Farmacia</span><span class="service-tag">Rayos X</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  const shell = buildShell('dashboard', html);
  shell.querySelector('#dashVerDetalles')?.addEventListener('click', () => Router.navigate('detalle-cita'));
  shell.querySelector('#dashVerTodo')?.addEventListener('click', () => Router.navigate('mis-citas'));
  shell.querySelector('#dashCompletarPerfil')?.addEventListener('click', () => Router.navigate('perfil'));
  shell.querySelectorAll('.acceso-card[data-action]').forEach(c => {
    c.addEventListener('click', () => {
      const a = c.dataset.action;
      if (a === 'agendar' || a === 'mis-citas') Router.navigate(a);
      else showToast('Función disponible próximamente', 'info');
    });
  });
  return shell;
});

/* ─────────────────────────────────────────────────
   VIEW 2 — AGENDAR (estado inicial)
───────────────────────────────────────────────── */
Router.register('agendar', () => {
  const html = `
    <div class="dash-header fade-in">
      <h1>¡Agenda tu nueva cita!</h1>
      <p>Hoy tienes una cita programada y 2 nuevos resultados de laboratorio.</p>
    </div>
    <div class="filter-bar fade-in">
      <div class="filter-group">
        <label>Especialidad</label>
        <div class="filter-select-wrap">
          <select class="filter-select" id="selEspecialidad">
            <option value="cardiologia" selected>Cardiología</option>
            <option value="dermatologia">Dermatología</option>
            <option value="pediatria">Pediatría</option>
            <option value="medicina-general">Medicina General</option>
            <option value="neurologia">Neurología</option>
          </select>
        </div>
      </div>
      <div class="filter-group">
        <label>Sede</label>
        <div class="filter-select-wrap">
          <select class="filter-select" id="selSede">
            <option value="norte" selected>Sede Principal - Norte</option>
            <option value="sur">Sede Sur</option>
            <option value="centro">Sede Centro</option>
          </select>
        </div>
      </div>
      <div class="filter-group">
        <label>Fecha</label>
        <div class="filter-input-wrap">
          <input class="filter-input" type="date" id="selFecha" value="2023-10-15" />
          ${SVG.calendar}
        </div>
      </div>
      <button class="btn-buscar" id="btnBuscar">${SVG.search} Buscar</button>
    </div>
    <div class="agendar-promo fade-in">
      <div class="promo-blue">
        <div class="promo-blue__icon">${SVG.shield}</div>
        <h3>Su Salud, Nuestra Prioridad</h3>
        <p>Agende con la confianza de que será atendido por profesionales certificados en instalaciones de vanguardia.</p>
        <ul><li>Atención inmediata</li><li>Médicos especialistas</li></ul>
      </div>
      <div class="promo-map" id="btnVerMapa">
        <div class="promo-map__img">${SVG.map}</div>
        <div class="promo-map__body"><h4>Ubicación de Clínicas</h4><p>Vea las direcciones de nuestras sedes para planificar su visita.</p></div>
      </div>
    </div>
    <div class="promo-ayuda fade-in">
      ${SVG.help}
      <div><h4>¿Necesita Ayuda?</h4><p>Nuestro centro de atención está disponible 24/7</p></div>
    </div>`;
  const shell = buildShell('agendar', html);
  shell.querySelector('#btnBuscar')?.addEventListener('click', () => Router.navigate('resultados-medicos'));
  shell.querySelector('#btnVerMapa')?.addEventListener('click', () => showToast('Cargando ubicación de sedes…', 'info'));
  return shell;
});

/* ─────────────────────────────────────────────────
   VIEW 3 — RESULTADOS MÉDICOS
───────────────────────────────────────────────── */
Router.register('resultados-medicos', () => {
  const medicos = [
    { nombre: 'Dr. Roberto Gómez', especialidad: 'Cardiología Clínica', exp: '12 años de exp.', rating: '4.9 (120)', slots: ['09:00 AM','10:30 AM','02:00 PM','03:30 PM'], avatar: '👨‍⚕️' },
    { nombre: 'Dra. Elena Martínez', especialidad: 'Cardiología Pediátrica', exp: '8 años de exp.', rating: '5.0 (84)', slots: ['11:15 AM','01:45 PM','04:30 PM'], avatar: '👩‍⚕️' },
    { nombre: 'Dr. Fernando Ruiz', especialidad: 'Cardiología Intervencionista', exp: '20 años de exp.', rating: '4.8 (215)', slots: ['08:00 AM','09:30 AM'], avatar: '👨‍⚕️' },
  ];
  const cards = medicos.map((m, mi) => `
    <div class="doctor-card fade-in" data-idx="${mi}">
      <div class="doctor-avatar">${m.avatar}</div>
      <div class="doctor-info">
        <div class="doctor-name">${m.nombre} ${SVG.verified}</div>
        <div class="doctor-specialty">${m.especialidad}</div>
        <div class="doctor-meta">
          <span>${SVG.clock} ${m.exp}</span>
          <span><svg viewBox="0 0 24 24" width="13" height="13" class="star" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${m.rating}</span>
        </div>
      </div>
      <div class="doctor-slots">
        <div class="slots-label">Horarios disponibles hoy</div>
        <div class="slots-grid">${m.slots.map((s,si) => `<button class="slot-btn" data-mi="${mi}" data-si="${si}" data-slot="${s}">${s}</button>`).join('')}</div>
        <button class="btn-agendar" data-mi="${mi}">Agendar Cita</button>
      </div>
    </div>`).join('');
  const html = `
    <div class="filter-bar fade-in">
      <div class="filter-group"><label>Especialidad</label><div class="filter-select-wrap"><select class="filter-select"><option selected>Cardiología</option><option>Dermatología</option><option>Pediatría</option></select></div></div>
      <div class="filter-group"><label>Sede</label><div class="filter-select-wrap"><select class="filter-select"><option selected>Sede Principal - Norte</option><option>Sede Sur</option></select></div></div>
      <div class="filter-group"><label>Fecha</label><div class="filter-input-wrap"><input class="filter-input" type="date" value="2023-10-15"/>${SVG.calendar}</div></div>
      <button class="btn-buscar">${SVG.search} Buscar</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 240px;gap:20px;">
      <div>
        <div class="medicos-header"><h2>Médicos disponibles</h2><span>12 resultados encontrados</span></div>
        <div class="medicos-list">${cards}</div>
        <div class="pagination">
          <button class="page-btn">${SVG.arrow_l}</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">${SVG.arrow_r}</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="promo-blue" style="border-radius:var(--radius-lg);padding:20px 18px;">
          <div class="promo-blue__icon">${SVG.shield}</div>
          <h3>Su Salud, Nuestra Prioridad</h3>
          <p>Agende con la confianza de que será atendido por profesionales certificados en instalaciones de vanguardia.</p>
          <ul><li>Atención inmediata</li><li>Médicos especialistas</li></ul>
        </div>
        <div class="promo-map"><div class="promo-map__img">${SVG.map}</div><div class="promo-map__body"><h4>Ubicación de Clínicas</h4><p>Vea las direcciones de nuestras sedes para planificar su visita.</p></div></div>
        <div class="promo-ayuda" style="margin-top:0;">${SVG.help}<div><h4>¿Necesita Ayuda?</h4><p>Centro de atención 24/7.</p></div></div>
      </div>
    </div>
    <!-- MODAL CONFIRMAR -->
    <div class="modal" id="modalConfirmar" style="max-width:480px;">
      <div class="modal-confirm__title"><h3>Estás a punto de agendar tu cita 😊</h3><p>Confirma que la información sea correcta:</p></div>
      <div class="modal-confirm__table">
        <div class="confirm-row"><span class="confirm-row__label">SEDE</span><span class="confirm-row__value">Sede Principal - Norte</span></div>
        <div class="confirm-row"><span class="confirm-row__label">ESPECIALIDAD</span><span class="confirm-row__value">Cardiología</span></div>
        <div class="confirm-row"><span class="confirm-row__label">FECHA</span><span class="confirm-row__value" id="confirmFecha">Oct 15, 2023</span></div>
        <div class="confirm-row"><span class="confirm-row__label">HORA</span><span class="confirm-row__value" id="confirmHora">—</span></div>
        <div class="confirm-row"><span class="confirm-row__label">MÉDICO</span><span class="confirm-row__value" id="confirmMedico">—</span></div>
      </div>
      <div class="modal-confirm__actions">
        <button class="btn btn-ghost btn-full" id="btnCancelarConfirm" style="flex:1">Cancelar</button>
        <button class="btn btn-primary btn-full" id="btnConfirmarCita" style="flex:1">Confirmar</button>
      </div>
    </div>`;

  const shell = buildShell('resultados-medicos', html);

  let selectedMedico = null, selectedSlot = null;

  shell.querySelectorAll('.slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mi = btn.dataset.mi;
      shell.querySelectorAll(`.slot-btn[data-mi="${mi}"]`).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSlot = btn.dataset.slot;
      selectedMedico = medicos[parseInt(mi)];
    });
  });

  shell.querySelectorAll('.btn-agendar').forEach(btn => {
    btn.addEventListener('click', () => {
      const mi = parseInt(btn.dataset.mi);
      selectedMedico = medicos[mi];
      if (!selectedSlot) {
        const firstSlot = shell.querySelector(`.slot-btn[data-mi="${mi}"]`);
        firstSlot?.click();
        selectedSlot = medicos[mi].slots[0];
      }
      shell.querySelector('#confirmHora').textContent = selectedSlot || medicos[mi].slots[0];
      shell.querySelector('#confirmMedico').textContent = medicos[mi].nombre;
      openModal('modalConfirmar');
    });
  });

  shell.querySelector('#btnCancelarConfirm')?.addEventListener('click', () => closeModal('modalConfirmar'));
  shell.querySelector('#btnConfirmarCita')?.addEventListener('click', () => {
    closeModal('modalConfirmar');
    Router.navigate('cita-confirmada');
  });
  return shell;
});

/* ─────────────────────────────────────────────────
   VIEW 4 — CITA CONFIRMADA
───────────────────────────────────────────────── */
Router.register('cita-confirmada', () => {
  const html = `
    <div class="success-header fade-in">
      <div class="success-icon">${SVG.check}</div>
      <div><h1>¡Tu cita ha sido agendada!</h1><p>Tu solicitud ha sido procesada correctamente. Hemos enviado los detalles a tu correo electrónico registrado.</p></div>
    </div>
    <div class="success-grid fade-in">
      <div class="resumen-card">
        <div class="resumen-card__header">
          <h3>Resumen de la Consulta</h3>
          <span class="badge badge--success">Confirmada</span>
        </div>
        <div class="resumen-details">
          <div class="resumen-detail-item">${SVG.pin}<div><label>Sede</label><span>Sede Principal - Norte</span></div></div>
          <div class="resumen-detail-item">${SVG.shield}<div><label>Especialidad</label><span>Cardiología</span></div></div>
          <div class="resumen-detail-item">${SVG.calendar}<div><label>Fecha y Hora</label><span>15 de Octubre, 2023 — 10:30 AM</span></div></div>
          <div class="resumen-detail-item">${SVG.doc}<div><label>Ubicación</label><span>Consultorio 402</span></div></div>
        </div>
        <div class="medico-asignado">
          <div class="medico-asignado__left">
            <div class="medico-asignado__avatar">👨‍⚕️</div>
            <div class="medico-asignado__info"><label>Médico Asignado</label><span>Dr. Roberto Gómez</span></div>
          </div>
          <a class="link-perfil-medico">Ver Perfil Médico ${SVG.arrow_r}</a>
        </div>
      </div>
      <div class="success-side">
        <div class="card-como-llegar">
          <div><h4>Cómo llegar</h4><p>Sede Principal — Calle 100 #15-32</p></div>
        </div>
        <div class="card-recomendacion">
          ${SVG.help}
          <div><h4>Recomendación:</h4><p>Recuerda llegar 15 minutos antes de tu cita y traer tu documento de identidad original.</p></div>
        </div>
      </div>
    </div>
    <div class="success-actions fade-in">
      <button class="btn btn-primary" id="btnIrMisCitas">Ir a Mis Citas</button>
      <button class="btn btn-outline" id="btnVolverInicio">Volver al Inicio</button>
    </div>
    <p class="link-soporte fade-in">¿Necesitas ayuda con tu reserva? <a>Contacta a soporte</a></p>`;
  const shell = buildShell('cita-confirmada', html);
  shell.querySelector('#btnIrMisCitas')?.addEventListener('click', () => Router.navigate('mis-citas'));
  shell.querySelector('#btnVolverInicio')?.addEventListener('click', () => Router.navigate('dashboard'));
  return shell;
});

/* ─────────────────────────────────────────────────
   VIEW 5 — MIS CITAS
───────────────────────────────────────────────── */
Router.register('mis-citas', () => {
  const html = `
    <div class="mis-citas-layout">
      <div>
        <div class="tabs">
          <div class="tab active" id="tabProximas">Citas Próximas</div>
          <div class="tab" id="tabHistorial">Historial de Citas</div>
        </div>
        <div class="citas-toolbar">
          <div></div>
          <div class="citas-toolbar-actions">
            <button class="btn-toolbar">${SVG.filter} Filtrar</button>
            <button class="btn-toolbar">${SVG.download} Exportar</button>
          </div>
        </div>
        <div class="cita-list" id="citaList">
          <!-- CITA 1 -->
          <div class="cita-card">
            <div class="cita-card__top">
              <div class="cita-card__avatar">👨‍⚕️</div>
              <div class="cita-card__info">
                <div class="cita-card__badges"><span class="badge badge--primary">Próxima</span><span class="cita-card__id">ID: #AP-8821</span></div>
                <div class="cita-card__doctor">Dr. Ricardo Alvear</div>
                <div class="cita-card__specialty">Cardiología Clínica</div>
              </div>
              <div class="cita-card__datetime"><div class="cita-card__date">Mañana, 15 Oct</div><div class="cita-card__time">09:30 AM</div></div>
            </div>
            <div class="cita-card__bottom">
              <div style="display:flex;gap:16px;">
                <span class="cita-card__location">${SVG.pin} Sede Norte, Consultorio 402</span>
                <span class="cita-card__tipo">${SVG.doc} Chequeo Anual</span>
              </div>
              <div class="cita-card__actions">
                <button class="btn-ver ver-detalle-btn">Ver Detalles</button>
                <button class="btn-pdf">${SVG.download} Descargar PDF</button>
              </div>
            </div>
          </div>
          <!-- CITA 2 -->
          <div class="cita-card">
            <div class="cita-card__top">
              <div class="cita-card__avatar">👩‍⚕️</div>
              <div class="cita-card__info">
                <div class="cita-card__badges"><span class="badge badge--success">Confirmada</span><span class="cita-card__id">ID: #AP-8845</span></div>
                <div class="cita-card__doctor">Dra. Elena Martínez</div>
                <div class="cita-card__specialty">Dermatología</div>
              </div>
              <div class="cita-card__datetime"><div class="cita-card__date">Vie, 20 Oct</div><div class="cita-card__time">04:15 PM</div></div>
            </div>
            <div class="cita-card__bottom">
              <span class="cita-card__location">${SVG.pin} Sede Principal, Consultorio 105</span>
              <div class="cita-card__actions">
                <button class="btn-ver ver-detalle-btn">Ver Detalles</button>
                <button class="btn-pdf">${SVG.download} Descargar PDF</button>
              </div>
            </div>
          </div>
          <!-- CITA 3 COMPLETADA -->
          <div class="cita-card completada">
            <div class="cita-card__top">
              <div class="cita-card__avatar">👨‍⚕️</div>
              <div class="cita-card__info">
                <div class="cita-card__badges"><span class="badge badge--gray">Completada</span></div>
                <div class="cita-card__doctor">Dr. Sergio Torres</div>
                <div class="cita-card__specialty">Medicina General</div>
              </div>
              <div class="cita-card__datetime"><div class="cita-card__date" style="color:var(--gray-500)">02 Oct</div><div class="cita-card__time" style="color:var(--gray-500)">10:00 AM</div></div>
            </div>
            <div class="cita-card__bottom">
              <span></span>
              <button class="btn-resumen">${SVG.doc} Ver Resumen</button>
            </div>
          </div>
        </div>
      </div>
      <!-- SIDEBAR -->
      <div>
        <div class="mini-calendar">
          <h4>Tu Calendario</h4>
          <div class="cal-grid">
            <span class="cal-header">L</span><span class="cal-header">M</span><span class="cal-header">M</span><span class="cal-header">J</span><span class="cal-header">V</span><span class="cal-header">S</span><span class="cal-header">D</span>
            <span class="cal-day">12</span><span class="cal-day">13</span><span class="cal-day">14</span><span class="cal-day today has-cita">15</span><span class="cal-day has-cita">16</span><span class="cal-day">17</span><span class="cal-day">18</span>
          </div>
          <div class="cal-alert">${SVG.clock} Próxima cita en 18 horas</div>
        </div>
        <div class="card-ayuda-citas">
          <h4>¿Necesitas ayuda?</h4>
          <p>Revisa nuestra guía de preparación para exámenes cardiológicos.</p>
          <button class="btn-guia">Ver Guía →</button>
        </div>
        <div class="resumen-mes" style="margin-top:14px;">
          <h4>Resumen de Octubre</h4>
          <div class="resumen-mes__stat"><span>Citas este mes</span><strong>4</strong></div>
          <div class="progress-bar"><div class="progress-bar__fill" style="width:75%"></div></div>
          <p>Has asistido al 75% de tus citas programadas este año.</p>
        </div>
      </div>
    </div>`;
  const shell = buildShell('mis-citas', html);
  shell.querySelectorAll('.ver-detalle-btn').forEach(btn => {
    btn.addEventListener('click', () => Router.navigate('detalle-cita'));
  });
  shell.querySelectorAll('.btn-pdf').forEach(btn => {
    btn.addEventListener('click', () => showToast('Descargando PDF de la cita…', 'info'));
  });
  shell.querySelector('#tabHistorial')?.addEventListener('click', (e) => {
    shell.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    showToast('Cargando historial completo…', 'info');
  });
  shell.querySelector('#tabProximas')?.addEventListener('click', (e) => {
    shell.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
  });
  return shell;
});

/* ─────────────────────────────────────────────────
   VIEW 6 — DETALLE CITA (estado: confirmada)
───────────────────────────────────────────────── */
Router.register('detalle-cita', (params = {}) => {
  const cancelada = params.cancelada || false;
  const html = `
    <div class="breadcrumb fade-in">Citas Médicas <span class="breadcrumb-sep">›</span> <span>Detalle de la Cita</span></div>
    <h2 class="fade-in" style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:var(--gray-900);margin-bottom:18px;">Cita: AP-8821</h2>
    <div class="detalle-layout">
      <div class="detalle-main">
        <div class="card-medico-detalle fade-in">
          <div class="card-medico-detalle__avatar">👨‍⚕️</div>
          <div class="card-medico-detalle__info">
            <div class="card-medico-detalle__name">Dr. Roberto Gómez</div>
            <div class="card-medico-detalle__specialty">Cardiología Clínica</div>
            <div class="card-medico-detalle__stats">
              <div class="detalle-stat">${SVG.shield}<span>Certificación Nacional</span></div>
              <div class="detalle-stat">${SVG.clock}<span>15 Años de experiencia</span></div>
            </div>
          </div>
          <span class="badge badge--primary" style="align-self:flex-start;">Especialista Senior</span>
        </div>
        <div class="card-info-grid fade-in">
          <div class="info-grid-2col" style="display:grid;grid-template-columns:1fr 1px 1fr;">
            <div class="info-section">
              <h4>${SVG.calendar} Fecha y Hora</h4>
              <div class="info-row"><label>Fecha</label><span>15 de Octubre, 2023</span></div>
              <div class="info-row"><label>Hora</label><span>10:30 AM</span></div>
            </div>
            <div class="info-divider"></div>
            <div class="info-section">
              <h4>${SVG.pin} Ubicación</h4>
              <div class="info-row"><label>Sede</label><span>Principal - Norte</span></div>
              <div class="info-row"><label>Consultorio</label><span>402 (Piso 4)</span></div>
            </div>
          </div>
        </div>
        <div class="card-instrucciones fade-in">
          <h4>${SVG.doc} Instrucciones y Preparación</h4>
          <div class="instrucciones-list">
            <div class="instruccion-item">${SVG.clock}<p>Es indispensable llegar <strong>15 minutos antes</strong> de la hora programada para completar el proceso de registro en recepción.</p></div>
            <div class="instruccion-item">${SVG.doc}<p>Por favor traiga su documento de identidad original y cualquier resultado de exámenes previos relacionados con su condición cardíaca.</p></div>
            <div class="instruccion-item">${SVG.shield}<p>Venga con ropa cómoda. En caso de requerir un electrocardiograma, se le indicará en el momento.</p></div>
          </div>
        </div>
      </div>
      <div class="detalle-side">
        <div class="card-mapa-sede fade-in">
          <div class="card-mapa-sede__img">
            <svg viewBox="0 0 200 140" width="100%" style="opacity:.3;"><rect width="200" height="140" fill="#374151"/><line x1="0" y1="35" x2="200" y2="35" stroke="#6B7280" stroke-width="1"/><line x1="0" y1="70" x2="200" y2="70" stroke="#6B7280" stroke-width="1"/><line x1="0" y1="105" x2="200" y2="105" stroke="#6B7280" stroke-width="1"/><line x1="50" y1="0" x2="50" y2="140" stroke="#6B7280" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="140" stroke="#6B7280" stroke-width="1"/><line x1="150" y1="0" x2="150" y2="140" stroke="#6B7280" stroke-width="1"/></svg>
            <svg viewBox="0 0 24 24" fill="#2B4EE6" stroke="none" style="position:absolute;width:32px;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
          <div class="card-mapa-sede__body"><a href="#">${SVG.pin} Ver en Google Maps</a></div>
        </div>
        <div class="card-acciones-detalle fade-in">
          <button class="btn btn-primary btn-full" id="btnRegresar">${SVG.arrow_l} Regresar</button>
          ${!cancelada ? `<p class="cancel-note">¿No puedes asistir? Cancela con al menos 24 horas de antelación.</p><button class="btn-cancelar-cita" id="btnCancelarCita">${SVG.x} Cancelar Cita</button>` : ''}
        </div>
        <div class="card-estado ${cancelada ? 'cancelada' : ''} fade-in">
          <div class="card-estado__row">
            <label>ESTADO</label>
            <span class="badge ${cancelada ? 'badge--danger' : 'badge--success'}">${cancelada ? 'Cancelada' : 'Confirmada'}</span>
          </div>
          <p>${cancelada ? 'Esta cita fue cancelada, si lo deseas puedes agendar una nueva.' : 'Cita confirmada por el sistema. Recibirás un recordatorio SMS 2 horas antes.'}</p>
        </div>
      </div>
    </div>
    <!-- MODAL CANCELAR (con motivo) -->
    <div class="modal" id="modalCancelar">
      <div class="modal__close-row"><button class="modal__close" id="closeCancelar">${SVG.x}</button></div>
      <div class="modal-cancel__title">¿Deseas cancelar tu cita?</div>
      <div class="modal-cancel__body">
        <div class="alert-warning-box">${SVG.warn}<p>Ten en cuenta que si cancelas ya no podrás asistir, y en caso de ser necesario tendrás que agendar una nueva cita</p></div>
        <div class="form-group"><label>Motivo de cancelación</label><select class="form-select" id="motivoCancelacion"><option value="">Selecciona una opción</option><option>No puedo asistir</option><option>Cambio de médico</option><option>Mejoría del paciente</option><option>Conflicto de horario</option><option>Otro</option></select></div>
        <div class="form-group"><label>Comentario (opcional)</label><textarea class="form-textarea" placeholder="Cuéntanos más detalles…"></textarea></div>
        <div class="modal-cancel__actions">
          <button class="btn-volver" id="btnVolverCancelar">Volver</button>
          <button class="btn btn-danger" id="btnConfirmarCancelacion">Confirmar Cancelación</button>
        </div>
      </div>
    </div>
    <!-- MODAL CITA CANCELADA -->
    <div class="modal modal-cancelada" id="modalCancelada">
      <div class="modal-cancelada__header"><div class="modal-cancelada__icon">${SVG.check}</div></div>
      <div class="modal-cancelada__body">
        <h3>Tu cita ha sido cancelada</h3>
        <p>Recuerda que estamos listos para ayudarte.</p>
        <button class="btn btn-primary btn-full" id="btnAceptarCancelada">Aceptar</button>
        <a class="link-ayuda">¿Necesitas ayuda?</a>
      </div>
    </div>`;

  const shell = buildShell('detalle-cita', html);
  shell.querySelector('#btnRegresar')?.addEventListener('click', () => Router.navigate('mis-citas'));
  shell.querySelector('#btnCancelarCita')?.addEventListener('click', () => openModal('modalCancelar'));
  shell.querySelector('#closeCancelar')?.addEventListener('click', () => closeModal('modalCancelar'));
  shell.querySelector('#btnVolverCancelar')?.addEventListener('click', () => closeModal('modalCancelar'));
  shell.querySelector('#btnConfirmarCancelacion')?.addEventListener('click', () => {
    const motivo = shell.querySelector('#motivoCancelacion')?.value;
    if (!motivo) { showToast('Selecciona un motivo de cancelación', 'danger'); return; }
    closeModal('modalCancelar');
    openModal('modalCancelada');
  });
  shell.querySelector('#btnAceptarCancelada')?.addEventListener('click', () => {
    closeModal('modalCancelada');
    Router.navigate('detalle-cita', { cancelada: true });
  });
  return shell;
});

/* ─────────────────────────────────────────────────
   VIEW 7 — MI PERFIL
───────────────────────────────────────────────── */
Router.register('perfil', () => {
  const html = `
    <div class="perfil-hero fade-in">
      <div class="perfil-avatar-wrap">
        <div class="perfil-avatar">👤</div>
        <div class="perfil-avatar-edit">${SVG.pencil}</div>
      </div>
      <div class="perfil-hero__info">
        <h1>Juan Andres Pérez Salazar</h1>
        <div class="perfil-badge">${SVG.check} Paciente Premium</div>
      </div>
      <div style="margin-left:auto;">
        <button class="btn btn-primary" id="btnEditarPerfil">${SVG.pencil} Editar Perfil</button>
      </div>
    </div>
    <div class="perfil-layout">
      <div class="perfil-main">
        <div class="card-info-personal fade-in">
          <div class="card-info-personal__header">
            <h3>${SVG.doc} Información Personal</h3>
            <span>Actualizado hace 2 días</span>
          </div>
          <div class="info-fields-grid">
            <div class="info-field"><label>NOMBRES</label><span>Juan Andres</span></div>
            <div class="info-field"><label>APELLIDOS</label><span>Pérez Salazar</span></div>
            <div class="info-field"><label>TIPO DE DOCUMENTO</label><span>Cédula de Ciudadanía</span></div>
            <div class="info-field"><label>NÚMERO DE DOCUMENTO</label><span>1.092.384.551</span></div>
            <div class="info-field"><label>CORREO ELECTRÓNICO</label><span>J.Salazar@gmail.com</span></div>
            <div class="info-field"><label>NÚMERO DE CELULAR</label><span>+57 312 455 9081</span></div>
          </div>
        </div>
        <div class="card-footer-items fade-in">
          <div class="footer-item">
            <div class="footer-item__icon peach">${SVG.lock}</div>
            <div class="footer-item__text"><label>PRIVACIDAD</label><span>Datos encriptados</span></div>
          </div>
          <div class="footer-item">
            <div class="footer-item__icon blue">${SVG.headset}</div>
            <div class="footer-item__text"><label>SOPORTE</label><span>Atención 24/7</span></div>
          </div>
          <div class="footer-item">
            <div class="footer-item__icon gray">${SVG.history}</div>
            <div class="footer-item__text"><label>ÚLTIMO ACCESO</label><span>Hoy, 08:45 AM</span></div>
          </div>
        </div>
      </div>
      <div class="perfil-side">
        <div class="card-progreso fade-in">
          <h4>Perfil al 65%</h4>
          <p>Completa tu información para mejorar la precisión de tus diagnósticos.</p>
          <div class="progreso-bar"><div class="progreso-bar__fill" style="width:65%"></div></div>
        </div>
        <div class="card-completar-historial fade-in">
          <div class="card-completar-historial__icon">${SVG.shield}</div>
          <h4>Completa tu información médica</h4>
          <p>Para brindarte una atención más precisa y personalizada, te invitamos a completar tu historial clínico y datos médicos.</p>
          <button class="btn btn-gold btn-full" id="btnCompletarHistorial">Completar Historial Médico</button>
        </div>
      </div>
    </div>`;
  const shell = buildShell('perfil', html);
  shell.querySelector('#btnEditarPerfil')?.addEventListener('click', () => showToast('Modo edición habilitado', 'info'));
  shell.querySelector('#btnCompletarHistorial')?.addEventListener('click', () => showToast('Cargando formulario médico…', 'info'));
  return shell;
});


document.addEventListener('DOMContentLoaded', () => {
  Router.navigate('dashboard');
});
