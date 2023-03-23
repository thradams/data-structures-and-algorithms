
[Main](README.md) > Dynamic Arrays

# Dynamic arrays

## Sample 1 - Array of basic types

```c
struct items {
  int* data;
  int  size;
  int  capacity;
}
```
[source → ](array1.md)

## Sample 2 - Array of copyable structs

```c
struct book {
    char title[10];
};

struct books {
    struct book* data;
    int size;
    int capacity;
};

```
[source → ](array2.md)

## Sample 3 - Array of movable structs

```c
struct book {
    char* title;
};

void book_destroy(struct book* book) {
    free(book->title);
}

struct books {
    struct book* data;
    int size;
    int capacity;
};
```
[source → ](array3.md)


## Sample 4  -  Array of owner pointers to structs

```c
struct book {
    char* title;
};

void book_destroy(struct book* book) {
    free(book->title);
}

struct books {
    struct book** data;
    int size;
    int capacity;
};
```
[source → ](array4.md)

