
.PHONY: deploy
deploy:
	git checkout gh-pages
	git reset --hard main
	npm run build
	git add --all
	git commmit -m Build
	git push --force origin gh-pages
