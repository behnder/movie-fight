const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData
}) => {
    root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" value="star war"/>
        <div class = "dropdown">
            <div class= "dropdown-menu">
                <div class="dropdown-content results"></div>
            </div >
        </div>
    <div class="results2"></div>
    `;
    const input = root.querySelector("input")
    const dropdown = root.querySelector('.dropdown')
    const resultsWrapper = root.querySelector('.results')
    const contentWrapper = root.querySelector('.results2')

    resultsWrapper.style.display = "none";
    input.style.display = "block";

    const onInput = async event => {

        const items = await fetchData(event.target.value);
        if (items.lenght === 0) {

            resultsWrapper.style.display = "none";
        } else {
            resultsWrapper.style.display = "block";
        }

        resultsWrapper.innerHTML = '';

        dropdown.classList.add("is-active")



        //FOR OF ITERACION DE ITEMS------------------------------
        for (let item of items) {

            const option = document.createElement('a');

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', async () => {
                dropdown.classList.remove('is-active')
                input.value = item.Title;
                let item2 = await onOptionSelect(item.imdbID)
                // contentWrapper.innerHTML = movieTemplate(item2)
            })
            resultsWrapper.appendChild(option)
        }
    }
    input.addEventListener('input', debounce(onInput, 900))
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
}