document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar menu item clicks
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Handle post action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const emoji = this.textContent;
            
            // Simple animation for button clicks
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Handle like button specifically
            if (emoji === '❤️') {
                // Toggle like state (simplified)
                if (this.style.color === 'red') {
                    this.style.color = '#262626';
                } else {
                    this.style.color = 'red';
                }
            }
        });
    });

    // Handle follow buttons
    const followButtons = document.querySelectorAll('.follow-btn');
    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === '팔로우') {
                this.textContent = '팔로잉';
                this.style.color = '#8e8e8e';
            } else {
                this.textContent = '팔로우';
                this.style.color = '#0095f6';
            }
        });
    });

    // Handle story clicks
    const storyItems = document.querySelectorAll('.story-item');
    storyItems.forEach(story => {
        story.addEventListener('click', function() {
            // Simple animation for story clicks
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Handle post options
    const postOptions = document.querySelectorAll('.post-options');
    postOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            alert('게시물 옵션 메뉴가 여기에 표시됩니다.');
        });
    });

    // Handle see all button
    const seeAllBtn = document.querySelector('.see-all-btn');
    if (seeAllBtn) {
        seeAllBtn.addEventListener('click', function() {
            alert('모든 추천 사용자를 보여주는 페이지로 이동합니다.');
        });
    }

    // Handle view comments
    const viewComments = document.querySelectorAll('.view-comments');
    viewComments.forEach(comment => {
        comment.addEventListener('click', function() {
            alert('댓글 전체 보기 모달이 여기에 표시됩니다.');
        });
    });

    // Infinite scroll simulation for main feed
    const mainContent = document.querySelector('.main-content');
    const feedContainer = document.querySelector('.feed-container');
    
    let isLoading = false;
    
    mainContent.addEventListener('scroll', function() {
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight;
        const clientHeight = this.clientHeight;
        
        // Load more content when user scrolls to bottom
        if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
            loadMorePosts();
        }
    });

    function loadMorePosts() {
        isLoading = true;
        
        // Simulate loading delay
        setTimeout(() => {
            const newPost = createNewPost();
            feedContainer.appendChild(newPost);
            isLoading = false;
        }, 1000);
    }

    function createNewPost() {
        const postTemplate = document.querySelector('.post').cloneNode(true);
        
        // Randomize some content
        const usernames = ['새사용자1', '새사용자2', '새사용자3', '새사용자4'];
        const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7', 'DDA0DD'];
        const captions = [
            '새로운 포스트입니다! 😊',
            '오늘의 기분 좋은 순간 ✨',
            '일상의 소소한 행복 🌟',
            '함께해서 즐거운 하루 💝'
        ];
        
        const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomCaption = captions[Math.floor(Math.random() * captions.length)];
        
        // Update post content
        postTemplate.querySelector('.post-username').textContent = randomUser;
        postTemplate.querySelector('.post-caption').textContent = randomCaption;
        postTemplate.querySelector('.post-time').textContent = '방금 전';
        
        // Update images
        const avatars = postTemplate.querySelectorAll('.post-avatar');
        avatars.forEach(avatar => {
            avatar.src = `https://via.placeholder.com/32/${randomColor}/ffffff?text=${randomUser.slice(0,2)}`;
        });
        
        const postImage = postTemplate.querySelector('.post-image img');
        postImage.src = `https://via.placeholder.com/600x600/${randomColor}/ffffff?text=New+Post`;
        
        // Reset like state
        const likeBtn = postTemplate.querySelector('.action-btn');
        likeBtn.style.color = '#262626';
        
        // Add event listeners to new post
        addPostEventListeners(postTemplate);
        
        return postTemplate;
    }

    function addPostEventListeners(post) {
        const actionButtons = post.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const emoji = this.textContent;
                
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);

                if (emoji === '❤️') {
                    if (this.style.color === 'red') {
                        this.style.color = '#262626';
                    } else {
                        this.style.color = 'red';
                    }
                }
            });
        });

        const postOption = post.querySelector('.post-options');
        postOption.addEventListener('click', function(e) {
            e.preventDefault();
            alert('게시물 옵션 메뉴가 여기에 표시됩니다.');
        });

        const viewComment = post.querySelector('.view-comments');
        viewComment.addEventListener('click', function() {
            alert('댓글 전체 보기 모달이 여기에 표시됩니다.');
        });
    }

    // Handle responsive sidebar for mobile
    function handleResponsiveSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const appContainer = document.querySelector('.app-container');
        
        if (window.innerWidth <= 480) {
            sidebar.classList.add('mobile-bottom');
        } else {
            sidebar.classList.remove('mobile-bottom');
        }
    }

    // Initial check and window resize handler
    handleResponsiveSidebar();
    window.addEventListener('resize', handleResponsiveSidebar);

    // Add smooth animations for loading states
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.backgroundColor = '#f0f0f0';
            this.style.color = '#999';
            this.alt = '이미지를 불러올 수 없습니다';
        });
    });

    console.log('H3 Social - Instagram-like Home Page Loaded Successfully! 🚀');
});