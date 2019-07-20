from flask import Flask, request, render_template
from flask_restful import Resource, Api, reqparse

from core import designers

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()
parser.add_argument("form_response")


@app.route('/')
def index():
    return render_template('index.html')


class Designers(Resource):
    def get(self):
        return designers.get_designer_records()

    def post(self):
        args = parser.parse_args()
        return designers.store_designer(args)


api.add_resource(Designers, '/api')

if __name__ == '__main__':
    app.run(debug=True)
