document.addEventListener("DOMContentLoaded",  () => {
    const body = document.querySelector('body')
    const modalClose = document.querySelector('.modal-close')
    const modal = document.querySelector('.modal')
    const paranja = document.querySelector('.paranja')

    const cardList = document.querySelector('.card__list')

    const modalForm = document.querySelector('.modal-form')
    const modalButton = document.querySelector('.button-order')

    modalClose.addEventListener('click', () => {
        modal.classList.toggle('modal--active')
        paranja.classList.toggle('paranja--active')
        body.classList.toggle('body-no-overflow')
    })

    cardList.addEventListener('click', (event) => {
        const card = event.target.closest('.card')
        const productName = card.querySelector('.card__title').textContent

        if(event.target !== card.querySelector('.card__button')) return
        modal.classList.toggle('modal--active')
        paranja.classList.toggle('paranja--active')
        body.classList.toggle('body-no-overflow')

        // заполнение формы 
        modalForm.querySelector('input[name="product-name"]').value = productName

    })

    //валидация
    const name = modal.querySelector('input[name="name"]')
    const tel = modal.querySelector('input[name="tel"]')
    const product = modal.querySelector('input[name="product-name"]')

    name.pattern = '[a-zA-Zа-яА-Я]{1,15}'

    // tel.pattern = "/+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}/"
    tel.value="+7(___)___-__-__"
    tel.addEventListener("input", mask, false);

    modalForm.addEventListener('submit', (event) => {
       
        event.preventDefault()
        console.log('OK')
        const phone = name.value
        const mail = tel.value
        const productItem = product.value
        const paramsString = {
            phone,
            mail,
            productItem
        }
        const urlParams = new URLSearchParams(paramsString).toString()
        fetch('mail-send.php?' + urlParams)
        .then( () => {
            name.value = ''
            tel.value = ''
            productItem.value = ''
        })
        
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

  }