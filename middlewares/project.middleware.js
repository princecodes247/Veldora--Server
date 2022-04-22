const canWriteToProject = (req, res, next) => {
    next()
}

const canReadProject = (req, res, next) => {
    next()
}

const ProjectMiddleware = {
    canWriteToProject,
    canReadProject
};

module.exports = ProjectMiddleware;