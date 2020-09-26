var rs = require("http/v4/rs");
var dao = require("test/data/dao/Entities/GenderExtension");

compositions = []

var http = require("test/api/http");

rs.service()
	.resource("")
		.get(function(ctx, request) {
			var queryOptions = {};
			var parameters = request.getParameterNames();
			for (var i = 0; i < parameters.length; i ++) {
				queryOptions[parameters[i]] = request.getParameter(parameters[i]);
			}
			var entities = dao.list(queryOptions);
			http.sendResponseOk(entities);
		})
		.catch(function(ctx, error) {
            if (error.name === "ForbiddenError") {
                http.sendForbiddenRequest(error.message));
            } else {
				http.sendResponseBadRequest(error.message);
			}
        })
.execute();
