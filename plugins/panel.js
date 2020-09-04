class Panel {
    constructor(context) {
        this.context = context;
    }
    async open(name) {
        const panel = await import("@/components/Panel/PanelContact");
        console.log(panel)
        // this.context.app.modal.show()
    }
}
export default (context, inject) => {
    inject('panel',  new Panel(context))
}