export const buildTicketModel = ({ title, tags, description, comments, status }) => ({
    title,
    tags,
    description,
    comments,
    status,
});

export const buildCommentModel = ({ id, author, content }) => ({
    id,
    author,
    content,
})
