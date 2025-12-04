// Ficheiro adicionado para Tarefa 3.2 e 3.3.
module.exports = {
    success: {
        s0: {
            http: 201,
            code: "SponsorCreated",
            type: "success"
        },
        s1: {
            http: 200,
            code: "SponsorUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "SponsorFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "SponsorDeleted",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "SponsorNotFound",
            type: "error"
        }
    }
};
