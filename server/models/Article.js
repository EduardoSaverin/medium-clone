const mongoose = require('mongoose');
let ArticleSchema = new mongoose.Schema(
    {
        text: String,
        title: String,
        description: String,
        feature_img: String,
        guid: String,
        claps: Number,
        tomatos: Number,
        date: { type: Date, default: Date.now },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ],
        categories: [String],
        automatedPost: { type: Boolean, default: false }
    }
)
ArticleSchema.methods.clap = function () {
    this.claps++;
    return this.save();
}
ArticleSchema.methods.throwTomato = function () {
    this.tomatos++;
    return this.save();
}
ArticleSchema.methods.comment = function (c) {
    this.comments.push(c);
    return this.save();
}
ArticleSchema.methods.addAuthor = function (author_id) {
    this.author = author_id;
    return this.save();
}
ArticleSchema.methods.getUserArticle = function (_id) {
    Article.find({ 'author': _id }).then((article) => {
        return article;
    })
}

module.exports = mongoose.model('Article', ArticleSchema);