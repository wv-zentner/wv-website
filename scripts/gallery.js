// Gallery JavaScript for filtering and animations

document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const loadMoreBtn = document.querySelector('.load-more-btn');
  let currentFilter = 'all';
  let itemsLoaded = 4; // Initial items to show

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      currentFilter = filter;
      filterGalleryItems(filter);
    });
  });

  // Filter gallery items
  function filterGalleryItems(filter) {
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        item.classList.add('fade-in');
        
        // Remove animation class after animation completes
        setTimeout(() => {
          item.classList.remove('fade-in');
        }, 600);
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Load more functionality
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      const hiddenItems = Array.from(galleryItems).filter(item => item.style.display === 'none');
      
      if (hiddenItems.length > 0) {
        const itemsToShow = hiddenItems.slice(0, itemsLoaded);
        
        itemsToShow.forEach((item, index) => {
          setTimeout(() => {
            item.style.display = 'block';
            item.classList.add('fade-in');
            
            setTimeout(() => {
              item.classList.remove('fade-in');
            }, 600);
          }, index * 100); // Stagger animation
        });
        
        itemsLoaded += itemsToShow.length;
        
        // Hide button if no more items
        if (itemsLoaded >= galleryItems.length) {
          loadMoreBtn.style.display = 'none';
        }
      }
    });
  }

  // Intersection Observer for lazy loading (optional enhancement)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe all gallery images
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      imageObserver.observe(img);
    }
  });
});