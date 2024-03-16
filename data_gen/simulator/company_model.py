
class Company(object):
    def __init__(self, name, categories):
        self.name = name
        self.categories = categories
    
    def __str__(self):
        return 'Company: %s'.format(self.name)
    
    def toDic(self):
        return {
            'name': self.name,
            'categories': self.categories
        }