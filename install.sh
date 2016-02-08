rm -fr cftool
rm -fr /usr/local/lib/cftool
rm -fr /usr/local/bin/cftool

git clone https://github.com/guilhermeleobas/cftool.git
cd cftool
npm install
cd ..

cp -fr cftool /usr/local/lib/cftool
ln -sf /usr/local/lib/cftool/src/cftool.js /usr/local/bin/cftool
