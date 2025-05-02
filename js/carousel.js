document.addEventListener('DOMContentLoaded', () => {
    // Configuration: Define your desired scaling factors here (as decimals)
    const imageScales = {
        'Picture1.png-1.png': 1,
        'Picture1.png-2.png': 0.75,
        'Picture1.png-3.png': 1,
        'Picture1.png-4.png': 0.5,
        'Picture1.png-5.png': 1,
        'Picture1.png-6.png': 1,
        'Picture1.png-7.png': 1,
        'Picture1.png-8.png': 1,
        'Picture1.png-9.png': 1,
        'Picture1.png-10.png': 1,
        'Picture1.png-11.png': 1,
        'Picture1.png-12.png': 1,
        'Picture1.png-13.png': 0.35,
        'Picture1.png-14.png': 0.75,
        'Picture1.png-15.png': 1,
        'Picture1.png-16.png': 1,
        'Picture1.png-17.png': 1,
    };

    // List of image file names in the images/logos/ directory (17 images)
    const images = [
        'Picture1.png-1.png',
        'Picture1.png-2.png',
        'Picture1.png-3.png',
        'Picture1.png-4.png',
        'Picture1.png-5.png',
        'Picture1.png-6.png',
        'Picture1.png-7.png',
        'Picture1.png-8.png',
        'Picture1.png-9.png',
        'Picture1.png-10.png',
        'Picture1.png-11.png',
        'Picture1.png-12.png',
        'Picture1.png-13.png',
        'Picture1.png-14.png',
        'Picture1.png-15.png',
        'Picture1.png-16.png',
        'Picture1.png-17.png',
    ];

    const carouselInner = document.getElementById('carousel-inner');

    // Function to determine itemsPerSlide based on viewport width
    function getItemsPerSlide() {
        const width = window.innerWidth;
        if (width < 768) {
            return 4; // Mobile: 4 images per slide
        } else {
            return 5; // Desktop: 5 images per slide
        }
    }

    let itemsPerSlide = getItemsPerSlide();

    // Function to split the images array into chunks of specified size, wrapping around
    function chunkArray(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            let chunk = array.slice(i, i + size);
            // If the last chunk has fewer images, wrap around to include images from the start
            if (chunk.length < size) {
                const remaining = size - chunk.length;
                chunk = chunk.concat(array.slice(0, remaining));
            }
            result.push(chunk);
        }
        return result;
    }

    let imageChunks = chunkArray(images, itemsPerSlide);

    function populateCarousel() {
        carouselInner.innerHTML = ''; // Clear existing items
        imageChunks = chunkArray(images, itemsPerSlide);
        
        imageChunks.forEach((chunk, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const slideContent = document.createElement('div');
            slideContent.classList.add('slide-content');

            chunk.forEach(imageName => {
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');

                const img = document.createElement('img');
                img.src = `images/logos/${imageName}`;
                img.alt = 'Logo';
                img.title = imageName;
                img.classList.add('img-fluid');

                // Apply individual scaling
                const scale = imageScales[imageName] || 1; // Default to 100% if not specified
                img.style.width = `${scale * 100}%`;

                imageContainer.appendChild(img);
                slideContent.appendChild(imageContainer);
            });

            carouselItem.appendChild(slideContent);
            carouselInner.appendChild(carouselItem);
        });
    }

    // Initialize the carousel to auto-scroll every 3 seconds
    let myCarousel = new bootstrap.Carousel('#myCarousel', {
        interval: 3000, // 3 seconds
        wrap: true,
        ride: 'carousel'
    });

    // Function to handle carousel population and initialization
    function handleCarousel() {
        myCarousel.dispose(); // Dispose the existing carousel first
        itemsPerSlide = getItemsPerSlide(); // Update itemsPerSlide based on current viewport
        populateCarousel(); // Repopulate the carousel with new itemsPerSlide
        myCarousel = new bootstrap.Carousel('#myCarousel', {
            interval: 3000,
            wrap: true,
            ride: 'carousel'
        });
    }

    // Initial population
    populateCarousel();

    // Re-initialize the carousel after initial population
    myCarousel.dispose(); // Dispose the initial instance
    myCarousel = new bootstrap.Carousel('#myCarousel', {
        interval: 3000,
        wrap: true,
        ride: 'carousel'
    });

    // Handle window resize to adjust itemsPerSlide and repopulate carousel
    window.addEventListener('resize', () => {
        const newItemsPerSlide = getItemsPerSlide();
        if (newItemsPerSlide !== itemsPerSlide) {
            handleCarousel();
        }
    });
});