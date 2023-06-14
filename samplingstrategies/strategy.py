from abc import ABC, abstractmethod
from neighborhood.models import Neighborhood
from pull.models import Pull

class SamplingStrategy(ABC):
    NAME = 'UNDEFINED'
    # Define with JSON/dict fieldname:list(type, description)
    # User experience of autogenerated fields based on JSON keys
    CONFIG = {
        'name': [str, NAME],
        'pull': [Pull, "Pull for calling request"],
        'neighborhood': [Neighborhood, "Neighborhood model to sample"],
        'sample_list': [list, "List in which to put sampled points"],
        'message_q': [list, "List in which to put messages for display on results page. Format [messages.TYPE, 'message string']"],
    }

    def __str__(self):
        return self.NAME

    @abstractmethod
    def configure(self, request, pull, neighborhood, sample_list, message_q):
        """
        Populate a dictionary with data needed to sample using this SamplingStrategy.

        Parameters
        ----------
        request : HTTP POST request
            form data; all data needed for the sample other than the pre-determined fields below
        pull : Pull model object
        neighborhood : Neighborhood model object
        sample_list : Empty list to populate with sampled points
        message_q : Empty list to populate with data to display on the sample success page

        Returns
        -------
        config dictionary
        """
        config = {
            'pull': pull,
            'neighborhood': neighborhood,
            'sample_list': sample_list,
            'message_q': message_q,
        }
        return config

    @abstractmethod
    def sample(self, config):
        """
        Sample from a neighborhood using a chosen SamplingStrategy.

        Parameters
        ----------
        config : dict
            all the data needed to fulfill the request; a dictionary with
            the same keys as CONFIG, but with values being actual value instances

        Returns
        -------
        None
        """
        raise NotImplementedError('Cannot call sample() on abstract SamplingStrategy class.')