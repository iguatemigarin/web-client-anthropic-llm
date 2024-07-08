
.PHONY: deploy
deploy:
	git checkout gh-pages
	git reset --hard main
	npm run build
	git add --all
	git commit -m Build
	git push --force origin gh-pages
