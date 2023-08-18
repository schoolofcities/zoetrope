from django import forms

class AddressForm(forms.Form):
    address = forms.CharField(label='Street Address',
     help_text="e.g. 55 St George St, Toronto, ON M5S 0C9",
     max_length=100)
