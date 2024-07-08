.PHONY
deploy:
	git checkout gh-pages
	git merge main
	npm run build
	git add --all -m 'Build'
	git push origin gh-pages
