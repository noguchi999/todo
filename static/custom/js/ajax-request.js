class AjaxRequest {
    constructor(xhr, form=undefined, f=undefined) {
        this.xhr = xhr
        if (form != undefined && form != undefined) {
            this._addEventSubmitForm(form)
            this.dataLoader = f    
        }
    }

    _addEventSubmitForm(form) {
        form.addEventListener('submit', e => {
            e.preventDefault()

            let data = this.dataLoader()
            if (form.checkValidity() == true) {
                form.submit.disabled = true;
                this.send(data, form.action)
            }
        }, false)
    }

    send(data, action, csrftoken="", method="POST") {
        this.xhr.open(method, action)
        if (csrftoken != "") {
            this.xhr.setRequestHeader("X-CSRFToken", csrftoken)
        }
        if (typeof data == "string") {
            this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        }
        this.xhr.send(data)
    }
}