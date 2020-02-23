class Book {
    constructor(isbn, title, desc, imageUrl, pageUrl,pubName, tagName) {
        this.isbn = isbn;
        this.title = title;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.pageUrl = pageUrl;
        this.publisher = pubName;
        this.tag = tagName;
    }
    getObject(){
        return {
            isbn:this.isbn, 
            title: this.title, 
            desc: this.desc,
            imageUrl: this.imageUrl, 
            pageUrl: this.pageUrl, 
            publisher: this.publisher, 
            tag: this.tag
        };
    }
}

module.exports = Book;