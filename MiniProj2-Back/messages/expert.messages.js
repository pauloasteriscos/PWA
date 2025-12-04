// Ficheiro adicionado para Tarefa 3.2 e 3.3.
module.exports = {
    success: {
        s0: {
            http: 201,
            code: "ExpertCreated",
            type: "success"
        },
        s1: {
            http: 200,
            code: "ExpertUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "ExpertFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "ExpertDeleted",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "ExpertNotFound",
            type: "error"
        }
    }
};
