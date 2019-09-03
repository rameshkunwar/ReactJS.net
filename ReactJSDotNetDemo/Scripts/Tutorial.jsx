class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        {/* this.state = { data: [] }; */ }
        this.state = { data: this.props.initialData };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    loadCommentsFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    }

    handleCommentSubmit(comment) {
        debugger;
        const data = new FormData();
        data.append('Author', comment.author);
        data.append('Text', comment.text);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.props.submitUrl, true);
        xhr.onload = () => this.loadCommentsFromServer();
        xhr.send(data);
    }
          

    componentDidMount() {
        {/* this.loadCommentsFromServer(); */}
        window.setInterval(
            () => this.loadCommentsFromServer(),
            this.props.pollInterval,
        );
    }

    loadCommentsFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        {/* window.setInterval(
            () => this.loadCommentsFromServer(),
            this.props.pollInterval,
        ); */}
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                {/*<CommentList data={this.props.url} */}
                    <CommentList data = {this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        const commentNodes = this.props.data.map(comment => (
            <Comment author={comment.Author} key={comment.Id}>
                {comment.Text}
            </Comment>
        ));
        return <div className="commentList">{commentNodes}</div>
       
    }
}

function createRemarkable() {
    var remarkable =
        "undefined" != typeof global && global.Remarkable
            ? global.Remarkable
            : window.Remarkable;
    return new remarkable();
}

class Comment extends React.Component {
    rawMarkup() {
        const md = createRemarkable(); {/*new Remarkable(); */ }
        const rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
       
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} /> 
            </div>
        );
    }
}


const dataxx = [
    { Id: 1, Author: 'Daniel Lo Nigro', Text: 'Hello ReactJS.NET World!' },
    { Id: 2, Author: 'Pete Hunt', Text: 'This is one comment' },
    { Id: 3, Author: 'Jordan Walke', Text: 'This is *another* comment' },
];

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { author: '', text: '' };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);      
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const author = this.state.author.trim();
        const text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ Author: author, Text: text });
        this.setState({ author: '', text: '' });
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
}
{/* ReactDOM.render(<CommentBox
    url="/Comments"
    submitUrl="/Comments/New"
/>, document.getElementById('content')); */}


