// get the input box for main comment
const mainComment = document.getElementById("myInput");

// to get the comment list conatiner so that we can use the evenet delegation
const commentList = document.getElementById("commentList");

// to add a new comment
let addComment = () => {
	if (!localStorage.getItem("comments")) {
		let comments = [];
		localStorage.setItem("comments", JSON.stringify(comments));
	}

	comments = JSON.parse(localStorage.getItem("comments"));
	comments.push({
		parentCommentId: null,
		commentId: Math.random()
			.toString()
			.substr(2, 7),
		commentText: mainComment.value,
		childComments: []
	});
	localStorage.setItem("comments", JSON.stringify(comments));
	finalCommentsViewPage();
	mainComment.value = "";
};
let deleteComments = () => {
	localStorage.clear();
	location.reload(); 
};
// create a reply button
let createReplyButtonCommentView = (id, operationType) => {
	let div = document.createElement("div");
	div.setAttribute("data-parentId", id);
	div.innerHTML = `<input type="text"> <a href="#" class="btn btn-primary">${operationType}</a>`;

	return div;
};
// genarate a single comment view card
let singleCommentCard = (obj, padding) => `
    <div class="card border-dark mt-2 mb-3 col-md-5"style="margin-left: ${padding}px;" data-parentId="${
	obj.parentCommentId
	}" id="${obj.commentId}">
	<div class="card-header text-white bg-dark mt-2 mb-2 ">${obj.commentText}</div>
        <a href="#" class="btn btn-danger col-2">Reply</a><span style="color: green;"> ${
					obj.childComments.length === 0 ? "0 replies to this comment" : obj.childComments.length + " replies to this answer"
				}</span>
	
    </div>
    `;
// a recursive method to generate a view if there are nested comment childrens
let createRecusiveView = (commentList, padding = 0) => {
	let fullView = "";
	for (let i of commentList) {
		console.log(i);
		fullView += singleCommentCard(i, padding);
		if (i.childComments.length > 0) {
			fullView += createRecusiveView(i.childComments, (padding += 20));
			padding -= 20;
		}
	}
	return fullView;
};

// final view to generate all the comments
let finalCommentsViewPage = () => {
	let getCommentsFromLocalStorage = JSON.parse(
		localStorage.getItem("comments")
	);
	if (getCommentsFromLocalStorage) {
		let allComments = createRecusiveView(getCommentsFromLocalStorage);
		commentList.innerHTML = allComments;
	}
};

finalCommentsViewPage();

// recursive method to push the new child comment
let addNewChildComment = (allComments, newComment) => {
	for (let i of allComments) {
		if (i.commentId === newComment.parentCommentId) {
			i.childComments.push(newComment);
		} else if (i.childComments.length > 0) {
			addNewChildComment(i.childComments, newComment);
		}
	}
};

// get all comments from local storage
let getAllComments = () => JSON.parse(localStorage.getItem("comments"));

// set comments object again in local storage
let setAllComments = allComments =>
	localStorage.setItem("comments", JSON.stringify(allComments));

// Event delegation for "comment", "edit comment", "like", "update comment" click and "add new child" comment in existing comments
commentList.addEventListener("click", e => {
	if (e.target.innerText === "Reply") {
		const parentId = !e.target.parentNode.getAttribute("data-parentId")
			? e.target.parentNode.getAttribute("data-parentId")
			: e.target.parentNode.getAttribute("id");
		const currentParentComment = e.target.parentNode;
		currentParentComment.appendChild(
			createReplyButtonCommentView(parentId, "Add Comment")
		);
		e.target.style.display = "none";
		e.target.nextSibling.style.display = "none";
	} else if (e.target.innerText === "Add Comment") {
		const parentId = e.target.parentNode.getAttribute("data-parentId")
			? e.target.parentNode.getAttribute("data-parentId")
			: e.target.parentNode.getAttribute("id");
		const newAddedComment = {
			parentCommentId: parentId,
			commentId: Math.random()
				.toString()
				.substr(2, 7),
			commentText: e.target.parentNode.firstChild.value,
			childComments: []
		};
		let getCommentsFromLocalStorage = getAllComments();
		addNewChildComment(getCommentsFromLocalStorage, newAddedComment);
		setAllComments(getCommentsFromLocalStorage);
		finalCommentsViewPage();
	}
});
