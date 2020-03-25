# bash

mkdir git1 && cd git1

git init

f1=$(echo '1' | git hash-object -w --stdin)

f2=$(echo '2' | git hash-object -w --stdin)

t1=$(printf '%s %s %s\t%s\n' 100644 blob $f1 f1 100644 blob $f2 f2 | git mktree)

printf '%s %s %s\t%s\n' 040000 tree $t1 t1 | git mktree

git read-tree $t1

# git ls-files -s

git checkout-index -a

rm f1 f2

git add .

echo '3' > f3

t2=$(git write-tree)

c1=$(echo 'c1' | git commit-tree $t1)

git checkout $c1

c2=$(echo 'c2' | git commit-tree $t2 -p $c1)

# git log --pretty=oneline $c2

echo 'one' > f1

git add f1

git commit -m 'focked commit'

fc1=$(cat .git/HEAD)

echo $c2 > .git/refs/heads/master

echo $fc1 > .git/refs/heads/forcked