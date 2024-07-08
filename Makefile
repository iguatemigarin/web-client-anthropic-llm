.PHONY
deploy:
	git checkout gh-pages
	git reset --hard main
	npm run build
	git add --all -m 'Build'
	git push origin gh-pages
