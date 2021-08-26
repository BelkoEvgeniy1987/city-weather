class WeatherArticle {
    constructor(tagName, cssClass, out) {
        this.tagName = tagName;
        this.cssClass = cssClass;
        this.out = out;
    }
    create() {
        out += `<${this.tagName} class='${this.cssClass}'></${this.tagName}>`
    }
}








