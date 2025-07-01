// JavaScript para el portfolio expandible

document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    const portfolioContainer = document.querySelector('.portfolio__container');
    let currentExpanded = null;
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'portfolio-overlay';
    document.body.appendChild(overlay);
    
    // Títulos de los proyectos
    const projectTitles = [
        'Analisis de rotación de personal',
        'Super Store interactivo',
        '',
        'Análisis de casos de cáncer de tiroides'
    ];
    
    portfolioItems.forEach((item, index) => {
        // Agregar título del proyecto
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = projectTitles[index];
        item.insertBefore(title, item.firstChild);
        
        // Agregar botón de cierre
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.style.display = 'none';
        item.appendChild(closeBtn);
        
        // Event listener para expandir
        item.addEventListener('click', function(e) {
            if (e.target === closeBtn) return;
            
            if (currentExpanded && currentExpanded !== item) {
                closeExpanded();
            }
            
            if (!item.classList.contains('expanded')) {
                expandItem(item);
            }
        });
        
        // Event listener para el botón de cierre
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeExpanded();
        });
    });
    
    // Event listener para el overlay
    overlay.addEventListener('click', closeExpanded);
    
    // Event listener para la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentExpanded) {
            closeExpanded();
        }
    });
    
    function expandItem(item) {
        currentExpanded = item;
        
        // Agregar clases
        item.classList.add('expanded');
        portfolioContainer.classList.add('has-expanded');
        overlay.classList.add('active');
        
        // Mostrar botón de cierre
        const closeBtn = item.querySelector('.close-btn');
        closeBtn.style.display = 'block';
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Animar entrada
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 50);
    }
    
    function closeExpanded() {
        if (!currentExpanded) return;
        
        const closeBtn = currentExpanded.querySelector('.close-btn');
        
        // Animación de salida
        currentExpanded.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            // Remover clases
            currentExpanded.classList.remove('expanded');
            portfolioContainer.classList.remove('has-expanded');
            overlay.classList.remove('active');
            
            // Ocultar botón de cierre
            closeBtn.style.display = 'none';
            
            // Restaurar scroll del body
            document.body.style.overflow = '';
            
            // Reset transform
            currentExpanded.style.transform = '';
            
            currentExpanded = null;
        }, 200);
    }
    
    // Mejorar la experiencia en móviles
    let touchStartY = 0;
    
    portfolioItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });
        
        item.addEventListener('touchend', function(e) {
            const touchEndY = e.changedTouches[0].clientY;
            const touchDiff = touchStartY - touchEndY;
            
            // Si es un swipe hacia arriba significativo, cerrar
            if (item.classList.contains('expanded') && touchDiff > 100) {
                closeExpanded();
            }
        });
    });
});