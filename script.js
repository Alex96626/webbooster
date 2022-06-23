document.addEventListener("DOMContentLoaded",  () => {
    const body = document.querySelector('body')
    const modalClose = document.querySelector('.modal-close')
    const modal = document.querySelector('.modal')
    const paranja = document.querySelector('.paranja')

    const cardList = document.querySelector('.card__list')

    const modalForm = document.querySelector('.modal-form')
    const modalButton = document.querySelector('.button-order')

    modalClose.addEventListener('click', () => {
        toggleModal(modal, paranja, body) 
    })

    cardList.addEventListener('click', (event) => {
        const card = event.target.closest('.card')
        const productName = card.querySelector('.card__title').textContent

        if(event.target !== card.querySelector('.card__button')) return
        toggleModal(modal, paranja, body) 

        // заполнение формы 
        modalForm.querySelector('input[name="product-name"]').value = productName

    })

    // отображение картинок карточки

    cardList.addEventListener('click', (event) => {
        const card = event.target.closest('.card')
        const cardImage = card.querySelector('.card__image')
        const productImageList = Array.from(card.querySelectorAll('.card__select-item img'))
        const imageTarget = productImageList.filter(item => item === event.target )
        if(imageTarget.length === 0) return
        cardImage.src = event.target.src
    })  

    //валидация
    const inputName = modal.querySelector('input[name="name"]')
    const inputTel = modal.querySelector('input[name="tel"]')
    const inputProduct = modal.querySelector('input[name="product-name"]')

    inputName.pattern = '[a-zA-Zа-яА-Я]{1,15}'

    inputTel.value="+7(___)___-__-__"
    inputTel.addEventListener("input", mask, false);
    
    // отправка mail
    const massageSend = document.querySelector('.masage-successful')
    modalForm.addEventListener('submit', (event) => {
       
        event.preventDefault()
        console.log('OK')
        const name = inputName.value
        const tel = inputTel.value
        const productItem = inputProduct.value
        const paramsString = {
            name,
            tel,
            productItem
        }

        const urlParams = new URLSearchParams(paramsString).toString()
        fetch('mail-send.php?' + urlParams)
        .then( () => {
            inputName.value = ''
            inputTel.value = ''
            inputProduct.value = ''

            setTimeout( () => {
                massageSend.classList.add('masage-successful--active')
            },0)
            
            setTimeout( () => {
                massageSend.classList.remove('masage-successful--active')
            },5000)
        })
        
    })

    // metrica 

    modalButton.addEventListener('click',ym(89276725,'reachGoal','button-order'))

    
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


function toggleModal(modal, paranja, body) {
    modal.classList.toggle('modal--active')
    paranja.classList.toggle('paranja--active')
    body.classList.toggle('body-no-overflow')
}