# Development to Live Update Guide

## How to push changes to live web app
In the following sections, you can find the instructions to several tasks that may be necessary to push changes to the live web app. Currently, this is all done in the PythonAnywhere bash console. 

### To change the source repository for PythonAnywhere to a different Github repository
`git remote set-url origin https://github.com/schoolofcities/zoetrope.git`
if you need to set githubu username and email to access the repository:
`git config –global user.name "gitUsername"`
`git config –global user.email "gitEmail"`

### Check status of repos and users:
`cat .git/config`
`git config –-list`

### Check git history
`git log --oneline`

### To pull updates from the SoC github repo, in the PythonAnywhere bash console:
`git pull`
OR if need specific pull from origin:
`git pull origin --rebase`

### To update static files like js and css and added images, in the PythonAnywhere base console:
`python manage.py collectstatic`
