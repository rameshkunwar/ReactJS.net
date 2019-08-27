class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
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
        window.setInterval(
            () => this.loadCommentsFromServer(),
            this.props.pollInterval,
        );
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                {/*<CommentList data={this.props.url} */}
                    <CommentList data = {this.state.data} />
                <CommentForm />
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
        //return (
        //    <div className="commentList">
        //        <Comment author="Daniel Lo Nigro">
        //            Hello ReactJS.NET World!
        //        </Comment>
        //        <Comment author="Pete Hunt">This is one comment</Comment>
        //        <Comment author="Jordan Walke">
        //            This is *another* comment
        //        </Comment>
        //    </div>
        //);
    }
}

class Comment extends React.Component {
    rawMarkup() {
        const md = new Remarkable();
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
    render() {
        return (
            <div className="commentForm">Hello, world! I am a CommentForm.</div>
        );
    }
}
ReactDOM.render(<CommentBox url={commentUrl} />, document.getElementById('content'));
//ReactDOM.render(<CommentBox data={data} />, document.getElementById('content'));

