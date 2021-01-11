let patron = {
    sum: 0
}

let zomb = {
    sum: 0
}

let vampire = {
    sum: 0
}

let smallMed = {
    sum: 0
}

let bigMed = {
    sum: 0
}

let popupBg = document.querySelector('.popup-bg')
let appArea = document.querySelector('.app-area')
let patronCounter = document.querySelector('.patron-counter')
let zombCounter = document.querySelector('.zomb-counter')
let vampireCounter = document.querySelector('.vampire-counter')
let chosenPatronCard = document.querySelectorAll('.donat-item')
let chosenPatronCardSmall 
let chosenPatronCardBig 
let cardBut = document.querySelector('.card-but')
let bigMedBut = document.querySelector('.med-but-big')
let smallMedBut = document.querySelector('.med-but-small')
let smallMedCounter = document.querySelector('.small-med-counter')
let bigMedCounter = document.querySelector('.big-med-counter')
let bigPrizeBut = document.querySelector('.prize-big-but')
let smallPrizeBut = document.querySelector('.prize-small-but')
let bigPrize = document.querySelector('.big-prize')
let smallPrize = document.querySelector('.small-prize')
let boss = document.querySelectorAll('.boss')
let myBoss 
let cross = document.querySelector('.cross')

chosenPatronCardSmall = chosenPatronCard[0]
chosenPatronCardBig = chosenPatronCard[1]

cross.addEventListener('click', () =>{
    document.querySelector('.popup-bg').classList.remove('popup-view')
})

let bossActiveted = () =>{
    let willBoss
    let eachBoss
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        willBoss = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
        eachBoss = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    getRandomIntInclusive(0,1)

    if (willBoss == 1) {
        getRandomIntInclusive(0,2) 
        myBoss = boss[eachBoss] 
        setTimeout(() =>{
            myBoss.classList.add('boss-active')
            alert('На вас напал босс, срочно добудьте 10 патронов, чтобы убить его.')
        },20000)

    }
    else{
        console.log('No boss');
    }
    
}

bossActiveted()
// НАЖИМАЕМ В ОБЛАСТЬ ИРОВОГО ПОЛЯ
appArea.addEventListener('click', (event) =>{
    let target = event.target


    // КЛИКАЕМ НА ПАТРОН
    if(target.classList == 'cell patron'){
        patron.sum++
        patronCounter.textContent = 'Патроны: ' + patron.sum

        target.classList  = 'cell patron waiting-patron'
        setTimeout(() =>{
            target.classList = 'cell patron'
        }, 6000)
        return
    }


    // КЛИКАЕМ НА ЗОМБИ
    if(target.classList == 'cell zomb' && patron.sum >= 1){
        target.classList  = 'cell zomb waiting-zomb'
        patron.sum--
        patronCounter.textContent = 'Патроны: ' + patron.sum
        setTimeout(() =>{
            target.classList = 'cell zomb'
            zomb.sum++
            zombCounter.textContent = 'Мозги: ' + zomb.sum
        }, 2000)
        return
    }
    
    if(target.classList == 'cell zomb' && patron.sum < 1){
        document.querySelector('.popup-bg').classList.add('popup-view')
    }


    // КЛИКАЕМ НА ВАМПИРА
    if(target.classList == 'cell vampire' && patron.sum >= 2){
        target.classList  = 'cell vampire waiting-vampire'
        patron.sum = patron.sum-2
        patronCounter.textContent = 'Патроны: ' + patron.sum
        setTimeout(() =>{
            target.classList = 'cell vampire'
            vampire.sum++
            vampireCounter.textContent = "Ампулы с кровью: " + vampire.sum
        }, 3000)   
        return 
    }

    if(target.classList == 'cell vampire' && patron.sum < 2){    
        document.querySelector('.popup-bg').classList.add('popup-view')
    }


    // Кликаем на босса

    if(target.classList == 'cell boss boss-active'){
        console.log('dfffffffff');
        if(patron.sum < 10){    
            document.querySelector('.popup-bg').classList.add('popup-view')
        }
         else{
            patron.sum = patron.sum - 10
            patronCounter.textContent = 'Патроны: ' + patron.sum
            bigMed.sum++
            bigMedCounter.textContent = 'Большие лекарства: ' + bigMed.sum
            
            myBoss.classList.remove('boss-active')
         }
    }

})


// ПОПАП ОКНО
// Кликаем на дешевые патроны
chosenPatronCardSmall.addEventListener('click', () =>{
    let div = document.querySelector('.popup')
    div.scrollTop = div.scrollHeight - div.clientHeight
    chosenPatronCardSmall.classList.toggle('card-chosen')
    chosenPatronCardBig.classList.remove('card-chosen')
})
// Кликаем на дорогие патроны
chosenPatronCardBig.addEventListener('click', () =>{
    let div = document.querySelector('.popup')
    div.scrollTop = div.scrollHeight - div.clientHeight
    chosenPatronCardBig.classList.toggle('card-chosen')
    chosenPatronCardSmall.classList.remove('card-chosen')
})

// Оплата картой
cardBut.addEventListener('click', () =>{
    let cardNumber = document.querySelector('.card-number')
    let cardDate = document.querySelector('.card-date')


    if(chosenPatronCardSmall.classList == 'donat-item card-chosen' || chosenPatronCardBig.classList == 'donat-item card-chosen'){
    
        if(cardNumber.value == '' || cardDate.value == ''){

            if(cardNumber.value == ''){
                cardNumber.classList.add('wrong')
            }

            else{
                cardNumber.classList.remove('wrong')
            }

            if(cardDate.value == ''){
                cardDate.classList.add('wrong')
            }

            else{
                cardDate.classList.remove('wrong')
            }
        }

        else{
            cardDate.value = ''
            cardNumber.value = ''
            cardNumber.classList.remove('wrong')
            cardDate.classList.remove('wrong')
            document.querySelector('.popup-bg').classList.remove('popup-view')
            alert('Деньги отправлены!')

            if(chosenPatronCardSmall.classList == 'donat-item card-chosen'){
                patron.sum = patron.sum + 10
                patronCounter.textContent = 'Патроны: ' + patron.sum
            }

            else{
                patron.sum = patron.sum + 100
                patronCounter.textContent = 'Патроны: ' + patron.sum
            }
        }
    }

    else{
        alert('Выберите патроны')
        let div = document.querySelector('.popup')
        div.scrollTop = 0
        
    }
})


// лекарства
smallMedBut.addEventListener('click', () =>{
    if( zomb.sum >= 7 && vampire.sum >= 5){
        smallMed.sum = smallMed.sum + 1
        smallMedCounter.textContent = 'Маленькое лекапство: ' + smallMed.sum
        vampire.sum = vampire.sum - 5
        vampireCounter.textContent = "Ампулы с кровью: " + vampire.sum
        zomb.sum = zomb.sum - 7
        zombCounter.textContent = 'Мозги: ' + zomb.sum
    }
    else{
        alert('Недостаточно ресурсов!!')
    }
})

bigMedBut.addEventListener('click', () =>{
    
    if( zomb.sum >= 15 && vampire.sum >= 10){
        bigMed.sum = bigMed.sum + 1
        bigMedCounter.textContent = 'Большое лекапство: ' + bigMed.sum
        vampire.sum = vampire.sum - 10
        vampireCounter.textContent = "Ампулы с кровью: " + vampire.sum
        zomb.sum = zomb.sum - 15
        zombCounter.textContent = 'Мозги: ' + zomb.sum
    }
    else{
        alert('Недостаточно ресурсов!!')
    }
})



let makeBigPrize = () =>{
    let interv = setInterval(changeBigPrize, 200)
    setTimeout(() =>{
        clearInterval(interv)
        setTimeout(() =>{
            bigPrize.style.backgroundImage = 'url(\https://www.toys-land.ru/img/goods/medium/ppn000020-3-251.jpg)'
        },5000)
    },5000)
}

let changeBigPrize = () =>{
    let variable

    function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    variable = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }

    getRandomIntInclusive(1,3)

    if(variable == 1){
        bigPrize.style.backgroundImage = 'url(https://ae01.alicdn.com/kf/HTB1ZgoMikCWBuNjy0Faq6xUlXXaM.jpg)'
    }

    if(variable == 2){
        bigPrize.style.backgroundImage = 'url(https://static.tildacdn.com/tild6238-6639-4738-b235-303833386336/_5-compressed.jpg)'
    }

    if(variable == 3){
        bigPrize.style.backgroundImage = 'url(https://images.ru.prom.st/587622886_w640_h640_nozh-babochka-volny.jpg)'
    }
}

let makeSmallPrize = () =>{
    let interv = setInterval(changeSmallPrize, 200)
    setTimeout(() =>{
        clearInterval(interv)
        setTimeout(() =>{
            smallPrize.style.backgroundImage = 'url(https://www.toys-land.ru/img/goods/medium/ppn000020-4-261.jpg)'
        },5000)
    },5000)
}

changeSmallPrize = () =>{
    let variable

    function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    variable = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }
    getRandomIntInclusive(1,3)
    
    if(variable == 1){
        smallPrize.style.backgroundImage = 'url(https://cutefreaks.ru/upload/iblock/353/35315f540a7c7566dcbaa2951091db34.jpg)'
    }

    if(variable == 2){
        smallPrize.style.backgroundImage = 'url(https://static.tildacdn.com/tild3266-6263-4339-a536-633361663762/5cfd0d24955de-1.jpg)'
    }

    if(variable == 3){
        smallPrize.style.backgroundImage = 'url(https://static.tildacdn.com/tild6134-3339-4934-b661-343064646663/k9Mh4147qlg.jpg)'
    }
}
// Призы
bigPrizeBut.addEventListener('click',  () =>{
    if (bigMed.sum >=1  ) {
        bigMed.sum--
        bigMedCounter.textContent = 'Большие лекарства: ' + bigMed.sum
        makeBigPrize()
    }
    else{
        alert('НЕХВАТКА БОЛЬШИХ ЛЕКАРСТВ')
    }
})

smallPrizeBut.addEventListener('click',  () =>{
    if (smallMed.sum >= 1) {
        smallMed.sum--
        smallMedCounter.textContent = 'Маленькие лекарства: ' + smallMed.sum
        makeSmallPrize()
    }
    else{
        alert('НЕХВАТКА МАЛЕНЬКИХ ЛЕКАРСТВ')
    }
    
})