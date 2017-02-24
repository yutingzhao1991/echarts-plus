rm -rf _book
gitbook build
cd _book
git init
git add -A
git commit -m 'update book'
git push -f git@github.com:yutingzhao1991/echarts-plus.git master:gh-pages