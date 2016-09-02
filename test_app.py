import unittest
from app import app

class TestApp(unittest.TestCase):
    def test_index(self):
        self.test_app = app.test_client()

        response = self.test_app.get('/')

        self.assertEquals(response.status, '200 OK')

    def test_get_players(self):
        self.test_app = app.test_client()

        response = self.test_app.get('/players')

        self.assertEquals(response.status, '200 OK')
        self.assertEquals(response.content_type, 'application/json')
