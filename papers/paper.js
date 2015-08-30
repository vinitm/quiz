$(document).ready(function () {

    var Answers = function (answers) {
        this.element = $('<ol></ol>').attr('class', 'answers row');
        var Option = function (type, contentURL) {
            if (type === 'string') {
                var answer = $('<li></li>').attr('class', 'answer col m12 s12');
                var content = $('<div><p>' + contentURL + '</p></div>').attr('class', 'content horizontal-center-wrapper');
                answer.append(content);
            } else if (type === 'image') {
                var answer = $('<li></li>').attr('class', 'answer col s6');
                var content = $('<div><img src="' + contentURL + '"/></div>').attr('class', 'content horizontal-center-wrapper');
                answer.append(content);
            }
            this.element = answer;
        };
        var addOption = function (option) {
            this.element.append(option.element);
        }.bind(this);
        var addOptions = function (options) {
            for (var i = 0; i < options.length; i++) {
                addOption(options[i].element);
            }
        };
        answers.forEach(function (entry) {
            var temp = new Option(entry.type, entry.content);
            addOption(temp);
        });
    };


    var Question = function (question) {
        this.element = $('<div></div>').attr('class', 'question');
        var addParagraph = function (paragraph) {
            this.element.append('<p>' + paragraph + '</p>');
        }.bind(this);
        var addImage = function (image) {
            this.element.append($('<img/>').attr('src', image));
        }.bind(this);
        if ('paragraph' in question)
            addParagraph(question.paragraph);
        if ('image' in question)
            addImage(question.image);
    };



    var Card = function (object) {
        this.element = $('<li></li>').attr('class', 'mcard col m7 s12');

        var addQuestion = function (question) {
            this.element.append(question.element);
        }.bind(this);

        var addAnswers = function (answers) {
            this.element.append(answers.element);
        }.bind(this);
        addQuestion(object.question);
        addAnswers(object.answers);
    };


    var Paper = function () {
        this.element = $('.paper');
    };

    Paper.prototype = {
        addCard: function (card) {
            this.element.append(card.element);
        },
        addCards: function (cards) {
            cards.forEach(function (item) {
                this.element.addCard(item);
            }.bind(this));
        },
        populate: function (jsonData) {
            jsonData.forEach(function (entry) {
                var answers = new Answers(entry.answers);
                var question = new Question(entry.question);
                var card = new Card({
                    question: question,
                    answers: answers
                });
                this.addCard(card);
            }.bind(this));
        }
    };


    var loadQuestions = function () {
        var url = location.search.substring(1);
        var data = {};
        var response = [];
        url.split('&').forEach(function (element, index) {
            var temp = element.split('=');
            data[temp[0]] = decodeURIComponent(temp[1]);
        });
        $.ajax('../find_paper.php', {
            method: 'GET',
            contentType: 'text'
        }).done(function (ajaxData) {
            response = $.parseJSON(ajaxData);
            var paper = new Paper();
            paper.populate(response);
        });
    };

    loadQuestions();
});