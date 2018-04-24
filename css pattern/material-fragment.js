const $id = (id) => {
    return document.getElementById(id);
};

function AnchorClick() {
    $id('anchor').addEventListener(`click`, () => {
        console.log(1);
    });
}