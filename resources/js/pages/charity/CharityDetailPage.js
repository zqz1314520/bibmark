export default {
    props: {
        charityId: {
            type: Number,
            required: true
        }
    },
    data: function() {
        return {
            name: '',
            logo: '',
            background_image: '',
            image_to_change: '',
            errors: [],
            isLoaded: false
        };
    },
    mounted: function () {
        this.getCharityDetails(this.charityId);
    },
    watch: {

    },
    methods: {
        getCharityDetails(id) {
            $('.profile-picture').block({
                message: '<div style="border-radius: 50px;"><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>',
                css: {
                    backgroundColor: 'transparent',
                    border: '0'
                },
                overlayCSS:  {
                    backgroundColor: 'black',
                    opacity: 0.8,
                    'border-radius': '50%'
                }
            });
            $('.profile-banner').block({
                message: '<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
                css: {
                    backgroundColor: 'transparent',
                    border: '0'
                },
                overlayCSS:  {
                    backgroundColor: 'black',
                    opacity: 0.8
                }
            });
            axios.get('/internal/charity/'+id)
                .then(response => {
                    console.log(response.data);
                    this.name = response.data.name;
                    this.logo = response.data.logo;
                    this.background_image = response.data.background_image;

                    this.isLoaded = true;
                    $('#dummy').ready(function() {
                        $('.profile-picture').unblock();
                        $('.profile-banner').unblock();
                    });
                    $('h1>input').unblock();
                })
                .catch(error => {
                    console.log(error.response);
                    this.isLoaded = true;
                    $('#main').unblock();
                    $('.profile-picture').unblock();
                    $('.profile-banner').unblock();
                    $('h1>input').unblock();
                });
        },
        browseExistsFileUpdate(type, id) {
            $("#"+type+id).click();
        },
        onExistsFileChanged(e, type) {
            if (e.target.files[0].type.match('image.*')){
                this.image_to_change = '';
                this.image_to_change = e.target.files[0];
                this.updateAwsImage(type);
            }

            console.log(e.target.files[0]);
        },
        updateAwsImage(type) {
            let formData = new FormData();
            formData.append('image', this.image_to_change);
            formData.append('type', 'profile');
            axios.post('/internal/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response.data.url);
                this.updateCharityDetails(type, response.data.url);

            }).catch((error) => {
                console.log(error.response);
            });
        },
        updateCharityDetails(type, url) {
            let formData = new FormData();
            formData.append('id', this.charityId);
            formData.append('name', this.name);
            if (type === 'logo'){
                $('figure.profile-picture').block({
                    message: '<div style="border-radius: 50px;"><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>',
                    css: {
                        backgroundColor: 'transparent',
                        border: '0'
                    },
                    overlayCSS:  {
                        backgroundColor: 'black',
                        opacity: 0.8,
                        'border-radius': '50%'
                    }
                });
                formData.append( type , url);
                formData.append('background_image', this.background_image ? this.background_image : '');
            }else if(type === 'background_image') {
                $('.profile-banner').block({
                    message: '<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
                    css: {
                        backgroundColor: 'transparent',
                        border: '0'
                    },
                    overlayCSS:  {
                        backgroundColor: 'black',
                        opacity: 0.8
                    }
                });
                formData.append( type , url);
                formData.append('logo', this.logo ? this.logo : '');
            }else {
                $('h1>input').block({
                    message: '<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
                    css: {
                        backgroundColor: 'transparent',
                        border: '0'
                    },
                    overlayCSS:  {
                        backgroundColor: 'black',
                        opacity: 0.8
                    }
                });
                formData.append('logo', this.logo ? this.logo : '');
                formData.append('background_image', this.background_image ? this.background_image : '');
            }

            window.axios.post('/internal/charity', formData)
                .then(response => {
                    console.log(response.data);
                    this.image_to_change = '';
                    this.errors = [];
                    this.getCharityDetails(this.charityId);

                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                    console.log(error.response);
                    $('#main').unblock();
                    $('.profile-picture').unblock();
                    $('.profile-banner').unblock();
                    $('h1>input').unblock();
                });
        },
        allowChangeName() {
            this.updateCharityDetails(null, null);
            $('#closeBtn').click();
        }

    }
}