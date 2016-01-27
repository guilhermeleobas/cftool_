#include <iostream>
#include <string>
#include <vector>

using namespace std;

pair<int, bool> convert (string s){
  
  int hour = 0;
  bool ap;
  
  if (s[1] == '1' && s[2] == '2'){
    s[1] = '0';
    s[2] = '0';
  }

  hour = (int)s[1]-'0';
  hour = 10*hour + (int)s[2]-'0';
  hour = 10*hour + (int)s[4]-'0';
  hour = 10*hour + (int)s[5]-'0';

  if (s[7] == 'a')
    ap = false;
  else
    ap = true;
  return make_pair (hour, ap);
}

int main(){
  
  string s;
  int n;
  vector<pair<int, bool> > v;

  cin >> n;
  getline (cin, s);
  for (int i=0; i<n; i++){
    getline (cin, s);
    v.push_back (convert(s));
  }
  
  int count = 1;
  int ten = 0;
  // am = false;
  // pm = true;
  for (int i=0; i<v.size()-1; i++){
    if (v[i+1].first == v[i].first && v[i+1].second == v[i].second)
      ten++;
    else
      ten = 0;

    if (v[i+1].second == false && v[i].second == true)
      count++;
    else if (v[i+1].second == v[i].second && v[i+1].first < v[i].first)
      count++;

    if (ten == 10){
      count++;
      ten = 0;
    }
  }

  cout << count << endl;

  return 0;
}
