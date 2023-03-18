
[Home](README.md)

# Dynamic arrays


```c
struct items {
  int* data;
  int  size;
  int  capacity;
}
```
[source → ](array1.md)


```c
struct item {
  int i;
};

struct items {
  struct item* data;
  int size;
  int capacity;
}
```
[source → ](array2.md)


```c
struct item {
  int i;
};

struct items {
  struct item** data;
  int size;
  int capacity;
}
```
[source → ](array3.md)



