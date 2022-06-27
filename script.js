document.addEventListener("DOMContentLoaded",  () => {
    const body = document.querySelector('body')
    const overlay = document.querySelector('.overlay')

    const cardList = document.querySelector('.card__list')

    const modalForm = document.querySelector('.modal-form')
    const modalButton = document.querySelector('.button-order')

    cardList.addEventListener('click', (event) => {
        const card = event.target.closest('.card')
        const productName = card.querySelector('.card__title').textContent

        if(event.target !== card.querySelector('.card__button')) return


        // заполнение формы 
        modalForm.querySelector('input[name="product-name"]').value = productName
        console.log(event.target)

    })

    // отображение картинок карточки

    cardList.addEventListener('click', (event) => {
        const card = event.target.closest('.card')
        const cardImage = card.querySelector('.card__image')
        const productImageList = Array.from(card.querySelectorAll('.card__select-item img'))
        const imageTarget = productImageList.filter(item => item === event.target )

        if(imageTarget.length === 0) return
        cardImage.src = event.target.src
        console.log(event.target)
    })  

    //валидация

    const sendRequestFormInputList = Array.from(modalForm.querySelectorAll('input'))
    const sendRequestFormInputObj = sendRequestFormInputList.reduce((acc, item) => {
        acc[item.name] = item
        return acc
    }, {})

    sendRequestFormInputObj.name.pattern = '[a-zA-Zа-яА-Я]{1,15}'

    sendRequestFormInputObj.tel.value="+7(___)___-__-__"
    sendRequestFormInputObj.tel.addEventListener("input", mask, false);
    
    // отправка mail
    const massageSend = document.querySelector('.masage-successful')
    modalForm.addEventListener('submit', (event) => {
       
        event.preventDefault()
        console.log('OK')

        fetch('mail-send.php/', {
            method: 'POST',
		    body: new FormData(modalForm),
        })
        .then(result => console.log(result.formData()))
        .then( () => {
            modalForm.reset()
           
            massageSend.classList.add('masage-successful--active')
          
            setTimeout( () => {
                massageSend.classList.remove('masage-successful--active')
                overlay.classList.toggle('overlay--active')
                body.classList.toggle('body-no-overflow')
                event.target.closest('.modal').classList.toggle('modal--active')
            },5000)

        })
        
    })

    // metrica 

    modalButton.addEventListener('click',ym(89276725,'reachGoal','button-order'))
   
    // клик вне формы

    document.addEventListener('click', (event) => {
        const modalList = [...document.querySelectorAll('[data-show-modal]')]
        const modalActiveCheck = modalList.some(item => item.classList.contains('modal--active'))
        if(!modalActiveCheck) return
        const modalActive = modalList.filter(item => item.classList.contains('modal--active'))[0]
        if(!event.target.closest('.modal')) {
            modalActive.classList.remove('modal--active')
            overlay.classList.toggle('overlay--active')
            body.classList.toggle('body-no-overflow')
        }
       

    })
    // открытие модалки
    document.addEventListener('click', (event) => {
        const modalList = [...document.querySelectorAll('[data-show-modal]')] // список модалок
        const targetModal = event.target.dataset.modal

        if(!targetModal) return
        modalList.filter( (item) => {
            return item.dataset.showModal === targetModal
        })[0]
        .classList.toggle('modal--active')
        
        overlay.classList.toggle('overlay--active')
        body.classList.toggle('body-no-overflow')
    })
    
    // закрытие модалки

    document.addEventListener('click', (event) => {
        console.log(event.target)
        if(!event.target.parentNode.classList.contains('modal-close')) return
        event.target.closest('.modal').classList.toggle('modal--active')
        overlay.classList.toggle('overlay--active')
        body.classList.toggle('body-no-overflow')
    })

    

}) 


function mask(e) {
    //console.log('mask',e);
    var matrix = this.placeholder,// .defaultValue
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
      return val.charAt(i++) || "_"
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this)
}

function setCursorPosition(pos, e) {
    e.focus();
    if (e.setSelectionRange) e.setSelectionRange(pos, pos);
    else if (e.createTextRange) {
      var range = e.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
    }
}
