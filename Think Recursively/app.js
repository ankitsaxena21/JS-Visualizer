const mainComment = document.getElementById("myInput");
const commentList = document.getElementById("commentList");

//add a new comment
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
	finalComments();
	mainComment.value = "";
};
let deleteComments = () => {
	localStorage.clear();
	location.reload(); 
};
// create a reply option
let createReplyButtonCommentView = (id, operationType) => {
	let div = document.createElement("div");
	div.setAttribute("data-parentId", id);
	div.innerHTML = `<input type="text"> <a href="#" class="btn btn-primary">${operationType}</a>`;

	return div;
};
// genarate a single comment card
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
// a recursive method to generate a collection of comments if there are nested comment childrens
let createRecusiveComments = (commentList, padding = 0) => {
	let fullView = "";
	for (let i of commentList) {
		console.log(i);
		fullView += singleCommentCard(i, padding);
		if (i.childComments.length > 0) {
			fullView += createRecusiveComments(i.childComments, (padding += 20));
			padding -= 20;
		}
	}
	return fullView;
};

// generate all the comments
let finalComments = () => {
	let getCommentsFromLocalStorage = JSON.parse(
		localStorage.getItem("comments")
	);
	if (getCommentsFromLocalStorage) {
		let allComments = createRecusiveComments(getCommentsFromLocalStorage);
		commentList.innerHTML = allComments;
	}
};

finalComments();

// recursive method to push the new child comment
let thinkRecursively = (allComments, newComment) => {
	for (let i of allComments) {
		if (i.commentId === newComment.parentCommentId) {
			i.childComments.push(newComment);
		} else if (i.childComments.length > 0) {
			thinkRecursively(i.childComments, newComment);
		}
	}
};

// get all comments from local storage
let getComments = () => JSON.parse(localStorage.getItem("comments"));

// set comments object again in local storage
let setComments = allComments =>
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
		let getCommentsFromLocalStorage = getComments();
		thinkRecursively(getCommentsFromLocalStorage, newAddedComment);
		setComments(getCommentsFromLocalStorage);
		finalComments();
	}
});
