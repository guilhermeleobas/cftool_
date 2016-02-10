#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main (){

  long long n;
  cin >> n;
  
  vector<long long> v;
  long long sum = 1;
  v.push_back (sum);
  int i = 2;
  while (true){
    v.push_back (v.back() + i);
    if (v.back () >= n) break;
    else i += 1;
  }
  
  vector<long long>::iterator it = upper_bound (v.begin(), v.end(), n);
  int k = it - v.begin();
  if (k == v.size()) k--;
  if (n == 1) cout << "1\n";
  else cout << n - v[k-1] << "\n";
  return 0;
}
