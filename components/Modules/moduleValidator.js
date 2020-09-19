export default {
    type: Object,
    validator(value) {
        return true
    },
    default() {
        return {
            module_items: [],
            main_image: {},
            module_images: [],
            module_files: [],
        }
    }
}