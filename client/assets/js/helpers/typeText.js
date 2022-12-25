const typeText = (element, text) => {

    let index = 0

    let interval = setInterval(() => {

        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }

    }, 20);
}

export default typeText;