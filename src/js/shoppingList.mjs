

document.querySelector(".checkboxList").addEventListener("click", checked)

export function checked()
{
    console.log('Checkbox clicked! Current state:', this.checked);
    
}
