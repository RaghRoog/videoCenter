export let displayContainer = (id) => {
    let container = document.getElementById(`${id}`)
    container.style.display = 'block'
}

export let containerDisplayNone = (id) => {
    let container = document.getElementById(`${id}`)
    container.style.display = 'none'
}
